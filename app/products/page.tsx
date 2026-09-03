import { createElement as e, Fragment } from 'react';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import { getProducts, WooProduct } from '../../lib/woo';

export default async function ProductsPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = searchParams?.q || '';
  let products: WooProduct[] = [];
  let failed = false;
  try { products = await getProducts({ perPage: 48, search: q }); } catch { failed = true; }
  const label = (text: string) => e('label', null, e('input', { type: 'checkbox' }), ' ' + text);
  const title = q ? '“' + q + '” results' : 'All products';
  const body = failed ? e('div', { className: 'empty-state' }, 'Products could not be loaded. Please try again.') : products.length ? e('div', { className: 'product-grid' }, ...products.map(product => e(ProductCard, { product, key: product.id }))) : e('div', { className: 'empty-state' }, e('h2', null, 'No products found'), e('p', null, 'Try searching for another term.'));
  return e(Fragment, null, e(Header), e('main', { className: 'listing-page container' }, e('div', { className: 'breadcrumb' }, 'Home › ' + title), e('div', { className: 'listing-layout' }, e('aside', { className: 'filters' }, e('h3', null, 'Filters'), e('div', { className: 'filter-group' }, e('strong', null, 'Category'), label('Home & Living'), label('Fashion'), label('Electronics'), label('Beauty & Care')), e('div', { className: 'filter-group' }, e('strong', null, 'Price'), label('BDT 0–500'), label('BDT 500–1,000'), label('BDT 1,000+'))), e('section', { className: 'listing-content' }, e('div', { className: 'listing-top' }, e('div', null, e('p', { className: 'eyebrow orange' }, 'ZUNAID MART CATALOG'), e('h1', null, title), e('span', null, products.length + ' products found')), e('select', { 'aria-label': 'Sort' }, e('option', null, 'Sort: Popular'), e('option', null, 'Price: Low to high'), e('option', null, 'New arrivals'))), body))));
}
