import Link from 'next/link';
import { createElement } from 'react';
import { formatBDT, WooProduct } from '../lib/woo';
import AddToCartButton from './AddToCartButton';

export default function ProductCard({ product }: { product: WooProduct }) {
          const image = product.images?.[0]?.src;
          const regular = product.prices?.regular_price;
          const sale = product.prices?.sale_price || product.prices?.price;
          const discount = regular && sale && Number(regular) > Number(sale) ? Math.round((1 - Number(sale) / Number(regular)) * 100) : 0;
          const imageContent = image ? createElement('img', { src: image, alt: product.name, className: 'product-image' }) : createElement('div', { className: 'image-placeholder' }, 'ZUNAID', createElement('br'), 'MART');
          const imageLink = createElement(Link, { href: '/products/' + product.id + '-' + product.slug, className: 'product-image-wrap' }, discount > 0 ? [createElement('span', { key: 'discount', className: 'discount-badge' }, '-' + discount + '%'), imageContent] : imageContent);
          const body = createElement('div', { className: 'product-body' },
                                         createElement('h3', null, product.name),
                                         createElement('div', { className: 'rating' }, '★ ', product.average_rating && Number(product.average_rating) > 0 ? Number(product.average_rating).toFixed(1) : 'New', product.review_count ? ' (' + product.review_count + ')' : ''),
                                         createElement('div', { className: 'price-row' }, createElement('strong', null, formatBDT(sale)), discount > 0 ? createElement('del', null, formatBDT(regular)) : null),
                                         createElement(AddToCartButton, { productId: product.id, compact: true }),
                                         createElement(Link, { href: '/products/' + product.id + '-' + product.slug, className: 'view-button' }, 'View details')
                                       );
          return createElement('article', { className: 'product-card' }, imageLink, body);
}
