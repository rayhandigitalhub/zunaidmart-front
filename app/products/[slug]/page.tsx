import { createElement as e, Fragment } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import AddToCartButton from '../../../components/AddToCartButton';
import { formatBDT, getProduct, stripHtml } from '../../../lib/woo';

function englishName(name: string) {
  const digits = '০১২৩৪৫৬৭৮৯';
  return name.replace(/[০-৯]/g, (digit) => String(digits.indexOf(digit))).replace(/পিছ|পিস/g, 'pieces').replace(/(\d+)\s*pieces/gi, '$1 pieces');
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  if (!product) return e(Fragment, null, e(Header), e('main', { className: 'container empty-state product-not-found' }, e('h1', null, 'Product not found'), e(Link, { href: '/products', className: 'dark-button' }, 'View all products')));
  const displayName = englishName(product.name);
  const image = product.images?.[0]?.src;
  const sale = product.prices?.sale_price || product.prices?.price;
  const regular = product.prices?.regular_price;
  const description = stripHtml(product.short_description || product.description || 'Contact us to learn more about this product.');
  return e(Fragment, null, e(Header), e('main', { className: 'container detail-page' }, e('div', { className: 'breadcrumb' }, 'Home › Product › ' + displayName), e('div', { className: 'detail-grid' }, e('div', { className: 'detail-image-panel' }, image ? e('img', { src: image, alt: displayName }) : e('div', { className: 'image-placeholder large' }, 'ZUNAID', e('br'), 'MART')), e('div', { className: 'detail-copy' }, e('p', { className: 'eyebrow orange' }, 'ZUNAID MART PRODUCT'), e('h1', null, displayName), e('div', { className: 'detail-rating' }, '★ ', e('span', null, product.average_rating && Number(product.average_rating) > 0 ? product.average_rating : 'New product')), e('div', { className: 'detail-price' }, e('strong', null, formatBDT(sale)), regular && sale !== regular ? e('del', null, formatBDT(regular)) : null), e('p', { className: 'detail-description' }, description), e('div', { className: 'quantity' }, e('span', null, 'Quantity'), e('span', null, '1')), e('div', { className: 'detail-actions' }, e(AddToCartButton, { productId: product.id }), e('button', { className: 'outline-button', type: 'button' }, '♡ Wishlist')), e('div', { className: 'detail-benefits' }, e('span', null, '🚚 Estimated delivery: 2–5 days'), e('span', null, '💵 Cash on Delivery available'), e('span', null, '↺ Returns policy applies'))))));
}
