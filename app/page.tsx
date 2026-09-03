import { createElement as e, Fragment } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import StorefrontMotion from '../components/StorefrontMotion';
import { getProducts, WooProduct } from '../lib/woo';

export default async function HomePage() {
      let products: WooProduct[] = [];
      try { products = await getProducts({ perPage: 12 }); } catch { products = []; }
      const link = (href: string, text: string, className?: string) => e(Link, { href, className }, text);
      const productGrid = products.length ? e('div', { className: 'product-grid' }, ...products.slice(0, 8).map(product => e(ProductCard, { product, key: product.id }))) : e('div', { className: 'empty-state' }, 'পণ্য লোড হচ্ছে বা সাময়িকভাবে পাওয়া যাচ্ছে না।');
      return e(Fragment, null,
                   e(Header),
                   e(StorefrontMotion, { productCount: products.length }),
                   e('main', null,
                           e('section', { className: 'hero container' },
                                     e('div', { className: 'hero-copy' }, e('p', { className: 'eyebrow' }, 'ZUNAID MART · SMART SHOPPING'), e('h1', null, 'Your everyday picks,', e('br'), e('em', null, 'delivered with ease')), e('p', { className: 'hero-sub' }, 'Trusted products, fair prices and easy delivery across Bangladesh— all in one place.'), link('/products', 'Shop now →', 'hero-button'), e('div', { className: 'hero-dots' }, e('i', { className: 'active' }), e('i'), e('i'), e('i'))),
                                     e('div', { className: 'hero-art', 'aria-label': 'Zunaid Mart promotional banner' }, e('div', { className: 'sun' }), e('div', { className: 'shape shape-one' }), e('div', { className: 'shape shape-two' }), e('div', { className: 'shape shape-three' }), e('div', { className: 'hero-card' }, e('small', null, 'Today's deal'), e('strong', null, 'Smart', e('br'), 'shopping'), e('span', null, 'Discover something new')))
                                   ),
                           e('section', { className: 'trust-row container' }, ...[['🚚', 'Fast delivery', 'Dhaka and nationwide'], ['✓', 'Curated products', 'Verified quality'], ['৳', 'Cash on Delivery', 'Pay on delivery'], ['↺', 'Easy returns', 'Friendly support']].map(item => e('div', { key: item[1] }, e('b', null, item[0]), e('span', null, e('strong', null, item[1]), e('small', null, item[2]))))),
                           e('section', { className: 'section container' }, e('div', { className: 'section-heading' }, e('div', null, e('p', { className: 'eyebrow orange' }, 'ZUNAID MART PICKS'), e('h2', null, 'Popular today')), link('/products', 'View all →')), productGrid),
                           e('section', { className: 'promo container' }, e('div', null, e('p', { className: 'eyebrow' }, 'Selected for you'), e('h2', null, 'Small prices', e('br'), e('strong', null, 'Big convenience')), e('p', null, 'Everyday essentials, made easier.'), link('/products', 'shopping শুরু করুন →', 'dark-button')), e('div', { className: 'promo-circles' }, e('span', null, '৳'), e('span', null, '✦'), e('span', null, '+')))
                         ),
                   e('footer', { id: 'contact' }, e('div', { className: 'container footer-inner' }, e('div', null, e(Link, { href: '/', className: 'brand footer-brand' }, e('span', { className: 'brand-mark' }, 'Z'), e('span', null, e('strong', null, 'ZUNAID'), e('small', null, 'MART'))), e('p', null, 'বাংলাদেশের জন্য সহজ ও বিশ্বস্ত অনলাইন shopping।')), e('div', null, e('h3', null, 'Support'), e('p', null, 'Contact us', e('br'), 'COD & delivery', e('br'), 'Returns policy')), e('div', null, e('h3', null, 'Follow along'), e('p', null, 'Facebook · Instagram', e('br'), '© 2026 Zunaid Mart'))))
                 );
}
