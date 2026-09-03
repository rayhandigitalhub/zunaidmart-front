import { createElement as e, Fragment } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import StorefrontMotion from '../components/StorefrontMotion';
import { getProducts, WooProduct } from '../lib/woo';

const sourceProductImage = 'https://zunaidmart.com/wp-content/uploads/2026/07/IMG_20260614_004859-1.jpg';

export default async function HomePage() {
  let products: WooProduct[] = [];
  try { products = await getProducts({ perPage: 12 }); } catch { products = []; }
  const link = (href: string, text: string, className?: string) => e(Link, { href, className }, text);
  const productGrid = products.length
    ? e('div', { className: 'product-grid' }, ...products.slice(0, 8).map(product => e(ProductCard, { product, key: product.id })))
    : e('div', { className: 'empty-state' }, 'Products are loading or temporarily unavailable.');
  return e(Fragment, null,
    e(Header),
    e(StorefrontMotion, { productCount: products.length }),
    e('main', null,
      e('section', { className: 'hero container' },
        e('div', { className: 'hero-copy' },
          e('p', { className: 'eyebrow' }, 'ZUNAID MART · SMART SHOPPING'),
          e('h1', null, 'Your everyday picks,', e('br'), e('em', null, 'delivered with ease')),
          e('p', { className: 'hero-sub' }, 'Trusted products, fair prices and easy delivery across Bangladesh— all in one place.'),
          e('div', { className: 'hero-actions' }, link('/products', 'Shop the collection →', 'hero-button'), e('span', { className: 'hero-source-note' }, 'Official source catalog')),
          e('div', { className: 'hero-dots' }, e('i', { className: 'active' }), e('i'), e('i'), e('i'))
        ),
        e('div', { className: 'hero-art', 'aria-label': 'Zunaid Mart source product showcase' },
          e('div', { className: 'sun' }), e('div', { className: 'shape shape-one' }), e('div', { className: 'shape shape-two' }), e('div', { className: 'shape shape-three' }),
          e('div', { className: 'hero-orbit orbit-one' }), e('div', { className: 'hero-orbit orbit-two' }),
          e('img', { src: sourceProductImage, alt: 'Zunaid Mart safety face protection product', className: 'hero-source-image' }),
          e('div', { className: 'hero-card' }, e('small', null, "Today's deal"), e('strong', null, 'Safety', e('br'), 'protection'), e('span', null, 'High-impact · crystal clear')),
          e('span', { className: 'hero-float float-one' }, 'COD READY'), e('span', { className: 'hero-float float-two' }, 'NATIONWIDE'), e('span', { className: 'hero-source-stamp' }, 'SOURCE · ZUNAIDMART.COM')
        )
      ),
      e('section', { className: 'trust-row container' }, ...[['🚚', 'Fast delivery', 'Dhaka and nationwide'], ['✓', 'Curated products', 'Source-led selection'], ['৳', 'Cash on Delivery', 'Pay when it arrives'], ['↺', 'Easy returns', 'Friendly support']].map(item => e('div', { key: item[1] }, e('b', null, item[0]), e('span', null, e('strong', null, item[1]), e('small', null, item[2]))))),
      e('section', { className: 'section container' }, e('div', { className: 'section-heading' }, e('div', null, e('p', { className: 'eyebrow orange' }, 'ZUNAID MART PICKS'), e('h2', null, 'Popular today')), link('/products', 'View all →')), productGrid),
      e('section', { className: 'promo container' }, e('div', null, e('p', { className: 'eyebrow' }, 'Selected for you'), e('h2', null, 'Small prices', e('br'), e('strong', null, 'Big convenience')), e('p', null, 'Everyday essentials, made easier.'), link('/products', 'Start shopping →', 'dark-button')), e('div', { className: 'promo-circles' }, e('span', null, '৳'), e('span', null, '✦'), e('span', null, '+')))
    ),
    e('footer', { id: 'contact' }, e('div', { className: 'container footer-inner' }, e('div', null, e(Link, { href: '/', className: 'brand footer-brand' }, e('img', { src: 'https://zunaidmart.com/wp-content/uploads/2026/06/cropped-wp-site-logo.png', alt: 'ZunaidMart official logo', className: 'brand-logo' }), e('span', null, e('strong', null, 'ZUNAID'), e('small', null, 'MART'))), e('p', null, 'Simple, trusted online shopping for Bangladesh.'), e('p', { className: 'footer-contact' }, 'Call 01622 051017 · WhatsApp +880 1605 586089')), e('div', null, e('h3', null, 'Support'), e('p', null, 'Contact us', e('br'), 'COD & delivery', e('br'), 'Returns policy')), e('div', null, e('h3', null, 'Follow along'), e('p', null, 'Facebook · Instagram', e('br'), '© 2026 Zunaid Mart'))))
  );
}
