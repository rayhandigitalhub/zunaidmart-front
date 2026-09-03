import { createElement as e, Fragment } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import StorefrontMotion from '../components/StorefrontMotion';
import { getProducts, WooProduct } from '../lib/woo';

const sourceImages = [
  'https://zunaidmart.com/wp-content/uploads/2026/07/IMG_20260614_004859-1.jpg',
  'https://zunaidmart.com/wp-content/uploads/2026/07/IMG_20260614_004338-1.jpg',
  'https://zunaidmart.com/wp-content/uploads/2026/06/turbo-cooler-1.jpg',
  'https://zunaidmart.com/wp-content/uploads/2026/07/61OgbHTcW9L._AC_UF10001000_QL80_FMwebp_.webp',
  'https://zunaidmart.com/wp-content/uploads/2026/07/IMG_20260614_004508-1-1.jpg',
];

export default async function HomePage() {
  let products: WooProduct[] = [];
  try { products = await getProducts({ perPage: 12 }); } catch { products = []; }
  const link = (href: string, text: string, className?: string) => e(Link, { href, className }, text);
  const productGrid = products.length ? e('div', { className: 'product-grid' }, ...products.slice(0, 8).map(product => e(ProductCard, { product, key: product.id }))) : e('div', { className: 'empty-state' }, 'Products are loading or temporarily unavailable.');
  const trustItems = [['Fast delivery', 'Dhaka and nationwide'], ['Curated products', 'Source-led selection'], ['Cash on Delivery', 'Pay when it arrives'], ['Easy returns', 'Friendly support']];
  return e(Fragment, null, e(Header), e(StorefrontMotion, { productCount: products.length }), e('main', null,
    e('section', { className: 'hero container' }, e('div', { className: 'hero-copy' }, e('p', { className: 'eyebrow' }, 'ZUNAID MART · SMART SHOPPING'), e('h1', null, 'Your everyday picks,', e('br'), e('em', null, 'delivered with ease')), e('p', { className: 'hero-sub' }, 'Trusted products, fair prices and easy delivery across Bangladesh— all in one place.'), e('div', { className: 'hero-actions' }, link('/products', 'Shop the collection →', 'hero-button'), e('span', { className: 'hero-source-note' }, 'Official source catalog')), e('div', { className: 'hero-dots' }, e('i', { className: 'active' }), e('i'), e('i'), e('i'))), e('div', { className: 'hero-art', 'aria-label': 'Zunaid Mart source product showcase' }, e('div', { className: 'sun' }), e('div', { className: 'shape shape-one' }), e('div', { className: 'shape shape-two' }), e('div', { className: 'shape shape-three' }), e('div', { className: 'hero-orbit orbit-one' }), e('div', { className: 'hero-orbit orbit-two' }), e('img', { src: sourceImages[1], alt: 'Zunaid Mart safety face protection product', className: 'hero-source-image' }), e('div', { className: 'hero-card' }, e('small', null, "Today's deal"), e('strong', null, 'Safety', e('br'), 'protection'), e('span', null, 'High-impact · crystal clear')), e('span', { className: 'hero-float float-one' }, 'COD READY'), e('span', { className: 'hero-float float-two' }, 'NATIONWIDE'), e('span', { className: 'hero-source-stamp' }, 'SOURCE · ZUNAIDMART.COM'))),
    e('section', { className: 'trust-row container' }, ...trustItems.map((item, index) => e('div', { key: item[0] }, e('b', null, e('img', { src: sourceImages[index], alt: '' })), e('span', null, e('strong', null, item[0]), e('small', null, item[1]))))),
    e('section', { className: 'section container' }, e('div', { className: 'section-heading' }, e('div', null, e('p', { className: 'eyebrow orange' }, 'ZUNAID MART PICKS'), e('h2', null, 'Popular today')), link('/products', 'View all →')), productGrid),
    e('section', { className: 'promo container' }, e('div', null, e('p', { className: 'eyebrow' }, 'Selected for you'), e('h2', null, 'Small prices', e('br'), e('strong', null, 'Big convenience')), e('p', null, 'Everyday essentials, made easier.'), link('/products', 'Start shopping →', 'dark-button')), e('div', { className: 'promo-circles' }, e('img', { src: sourceImages[2], alt: '' }), e('img', { src: sourceImages[3], alt: '' }), e('img', { src: sourceImages[4], alt: '' })))
  ), e('footer', { id: 'contact', className: 'site-footer' }, e('div', { className: 'container footer-shell' }, e('div', { className: 'footer-brand-block' }, e(Link, { href: '/', className: 'brand footer-brand' }, e('img', { src: 'https://zunaidmart.com/wp-content/uploads/2026/06/cropped-wp-site-logo.png', alt: 'ZunaidMart official logo', className: 'brand-logo' }), e('span', null, e('strong', null, 'ZUNAID'), e('small', null, 'MART'))), e('p', { className: 'footer-lead' }, 'Simple, trusted online shopping for Bangladesh.'), e('div', { className: 'footer-contact-card' }, e('strong', null, 'Need help?'), e('span', null, 'Call 01622 051017'), e('span', null, 'WhatsApp +880 1605 586089'))), e('div', { className: 'footer-column' }, e('h3', null, 'Shop'), link('/products', 'All products'), link('/products?q=deal', "Today's deals"), link('/cart', 'Your cart')), e('div', { className: 'footer-column' }, e('h3', null, 'Support'), link('#contact', 'Contact us'), link('#delivery', 'COD & delivery'), link('/checkout', 'Checkout')), e('div', { className: 'footer-column' }, e('h3', null, 'Stay connected'), e('p', null, 'Official updates and product picks.'), e('span', { className: 'footer-social' }, 'Facebook · Instagram'))), e('div', { className: 'container footer-bottom' }, e('span', null, '© 2026 Zunaid Mart'), e('span', null, 'Source catalog: zunaidmart.com'))));
}
