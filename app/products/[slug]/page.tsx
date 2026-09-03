import { createElement as e, Fragment } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import { formatBDT, getProduct, stripHtml } from '../../../lib/woo';

export default async function ProductPage({ params }: { params: { slug: string } }) {
      const product = await getProduct(params.slug);
      if (!product) return e(Fragment, null, e(Header), e('main', { className: 'container empty-state product-not-found' }, e('h1', null, 'পণ্যটি পাওয়া যায়নি'), e(Link, { href: '/products', className: 'dark-button' }, 'সব পণ্য দেখুন')));
      const image = product.images?.[0]?.src;
      const sale = product.prices?.sale_price || product.prices?.price;
      const regular = product.prices?.regular_price;
      const description = stripHtml(product.short_description || product.description || 'এই পণ্যটি সম্পর্কে বিস্তারিত জানতে আমাদের সাথে যোগাযোগ করুন।');
      return e(Fragment, null, e(Header), e('main', { className: 'container detail-page' }, e('div', { className: 'breadcrumb' }, 'হোম › পণ্য › ' + product.name), e('div', { className: 'detail-grid' }, e('div', { className: 'detail-image-panel' }, image ? e('img', { src: image, alt: product.name }) : e('div', { className: 'image-placeholder large' }, 'ZUNAID', e('br'), 'MART')), e('div', { className: 'detail-copy' }, e('p', { className: 'eyebrow orange' }, 'ZUNAID MART PRODUCT'), e('h1', null, product.name), e('div', { className: 'detail-rating' }, '★ ', e('span', null, product.average_rating && Number(product.average_rating) > 0 ? product.average_rating : 'নতুন পণ্য')), e('div', { className: 'detail-price' }, e('strong', null, formatBDT(sale)), regular && sale !== regular ? e('del', null, formatBDT(regular)) : null), e('p', { className: 'detail-description' }, description), e('div', { className: 'quantity' }, e('span', null, 'পরিমাণ'), e('button', null, '−'), e('b', null, '1'), e('button', null, '+')), e('div', { className: 'detail-actions' }, e('button', { className: 'dark-button' }, 'কার্টে যোগ করুন'), e('button', { className: 'outline-button' }, '♡ উইশলিস্ট')), e('div', { className: 'detail-benefits' }, e('span', null, '🚚 আনুমানিক ডেলিভারি: ২–৫ দিন'), e('span', null, '💵 ক্যাশ অন ডেলিভারি available'), e('span', null, '↺ রিটার্ন নীতি প্রযোজ্য'))))));
}
