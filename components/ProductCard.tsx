import Link from 'next/link';
import { createElement } from 'react';
import { formatBDT, WooProduct } from '../lib/woo';
import AddToCartButton from './AddToCartButton';

export default function ProductCard({ product }: { product: WooProduct }) {
        const image = product.images?.[0]?.src;
        const regular = product.prices?.regular_price;
        const sale = product.prices?.sale_price || product.prices?.price;
        const discount = regular && sale && Number(regular) > Number(sale) ? Math.round((1 - Number(sale) / Number(regular)) * 100) : 0;
        const children = [
                  image ? createElement('img', { key: 'image', src: image, alt: product.name, className: 'product-image' }) : createElement('div', { key: 'placeholder', className: 'image-placeholder' }, 'ZUNAID', createElement('br'), 'MART')
                ];
        if (discount > 0) children.unshift(createElement('span', { key: 'discount', className: 'discount-badge' }, '-' + discount + '%'));
        children.push(
                  createElement('div', { key: 'body', className: 'product-body' },
                                      createElement('h3', null, product.name),
                                      createElement('div', { className: 'rating' }, '★ ', product.average_rating && Number(product.average_rating) > 0 ? Number(product.average_rating).toFixed(1) : 'নতুন', product.review_count ? ' (' + product.review_count + ')' : ''),
                                      createElement('div', { className: 'price-row' }, createElement('strong', null, formatBDT(sale)), discount > 0 ? createElement('del', null, formatBDT(regular)) : null),
                                      createElement(AddToCartButton, { productId: product.id, compact: true }),
                                      createElement(Link, { href: '/products/' + product.id + '-' + product.slug, className: 'view-button' }, 'বিস্তারিত দেখুন')
                                    )
                );
        return createElement('article', { className: 'product-card' }, createElement(Link, { href: '/products/' + product.id + '-' + product.slug, className: 'product-image-wrap' }, children));
}
