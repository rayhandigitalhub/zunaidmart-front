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
      const title = q ? '“' + q + '” এর ফলাফল' : 'সব পণ্য';
      const body = failed ? e('div', { className: 'empty-state' }, 'পণ্য লোড করা যায়নি। কিছুক্ষণ পর আবার চেষ্টা করুন।') : products.length ? e('div', { className: 'product-grid' }, ...products.map(product => e(ProductCard, { product, key: product.id }))) : e('div', { className: 'empty-state' }, e('h2', null, 'কোনো পণ্য পাওয়া যায়নি'), e('p', null, 'অন্য কোনো শব্দ দিয়ে সার্চ করে দেখুন।'));
      return e(Fragment, null, e(Header), e('main', { className: 'listing-page container' }, e('div', { className: 'breadcrumb' }, 'হোম › ' + title), e('div', { className: 'listing-layout' }, e('aside', { className: 'filters' }, e('h3', null, 'ফিল্টার'), e('div', { className: 'filter-group' }, e('strong', null, 'ক্যাটাগরি'), label('ঘর ও জীবন'), label('ফ্যাশন'), label('ইলেকট্রনিক্স'), label('বিউটি ও কেয়ার')), e('div', { className: 'filter-group' }, e('strong', null, 'দাম'), label('৳ ০–৫০০'), label('৳ ৫০০–১,০০০'), label('৳ ১,০০০+'))), e('section', { className: 'listing-content' }, e('div', { className: 'listing-top' }, e('div', null, e('p', { className: 'eyebrow orange' }, 'ZUNAID MART CATALOG'), e('h1', null, title), e('span', null, products.length + 'টি পণ্য পাওয়া গেছে')), e('select', { 'aria-label': 'সাজান' }, e('option', null, 'সাজান: জনপ্রিয়'), e('option', null, 'দাম: কম থেকে বেশি'), e('option', null, 'নতুন পণ্য'))), body))));
}
