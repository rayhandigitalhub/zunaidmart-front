import Link from 'next/link';
import { createElement } from 'react';
import { formatBDT, WooProduct } from '../lib/woo';

function englishName(name: string) { const digits = '০১২৩৪৫৬৭৮৯'; return name.replace(/[০-৯]/g, (digit) => String(digits.indexOf(digit))).replace(/পিছ|পিস/g, 'pieces').replace(/(\d+)\s*pieces/gi, '$1 pieces'); }

export default function ProductCard({ product }: { product: WooProduct }) {
  const displayName = englishName(product.name); const image = product.images?.[0]?.src; const regular = product.prices?.regular_price; const sale = product.prices?.sale_price || product.prices?.price; const discount = regular && sale && Number(regular) > Number(sale) ? Math.round((1 - Number(sale) / Number(regular)) * 100) : 0; const detailHref = '/products/' + product.id + '-' + product.slug;
  const imageContent = image ? createElement('img', { src: image, alt: displayName, className: 'product-image' }) : createElement('div', { className: 'image-placeholder' }, 'ZUNAID', createElement('br'), 'MART');
  const imageLink = createElement(Link, { href: detailHref, className: 'product-image-wrap', 'aria-label': 'View ' + displayName }, discount > 0 ? [createElement('span', { key: 'discount', className: 'discount-badge' }, '-' + discount + '%'), imageContent] : imageContent);
  const body = createElement('div', { className: 'product-body' }, createElement(Link, { href: detailHref, className: 'product-title-link' }, createElement('h3', null, displayName)), createElement('div', { className: 'rating' }, '★ ', product.average_rating && Number(product.average_rating) > 0 ? Number(product.average_rating).toFixed(1) : 'New', product.review_count ? ' (' + product.review_count + ')' : ''), createElement('div', { className: 'price-row' }, createElement('strong', null, formatBDT(sale)), discount > 0 ? createElement('del', null, formatBDT(regular)) : null), createElement(Link, { href: detailHref, className: 'view-button' }, 'View product'));
  return createElement('article', { className: 'product-card' }, imageLink, body);
}
