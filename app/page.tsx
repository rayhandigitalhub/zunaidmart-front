import { createElement as e, Fragment } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { getProducts, WooProduct } from '../lib/woo';

export default async function HomePage() {
      let products: WooProduct[] = [];
      try { products = await getProducts({ perPage: 12 }); } catch { products = []; }
      const link = (href: string, text: string, className?: string) => e(Link, { href, className }, text);
      const productGrid = products.length ? e('div', { className: 'product-grid' }, ...products.slice(0, 8).map(product => e(ProductCard, { product, key: product.id }))) : e('div', { className: 'empty-state' }, 'পণ্য লোড হচ্ছে বা সাময়িকভাবে পাওয়া যাচ্ছে না।');
      return e(Fragment, null,
                   e(Header),
                   e('main', null,
                           e('section', { className: 'hero container' },
                                     e('div', { className: 'hero-copy' }, e('p', { className: 'eyebrow' }, 'ZUNAID MART · SMART SHOPPING'), e('h1', null, 'প্রতিদিনের পছন্দ,', e('br'), e('em', null, 'সহজেই আপনার ঘরে')), e('p', { className: 'hero-sub' }, 'বিশ্বস্ত পণ্য, সাশ্রয়ী দাম এবং বাংলাদেশের জন্য সহজ ডেলিভারি—সব এক জায়গায়।'), link('/products', 'এখনই শপ করুন →', 'hero-button'), e('div', { className: 'hero-dots' }, e('i', { className: 'active' }), e('i'), e('i'), e('i'))),
                                     e('div', { className: 'hero-art', 'aria-label': 'Zunaid Mart promotional banner' }, e('div', { className: 'sun' }), e('div', { className: 'shape shape-one' }), e('div', { className: 'shape shape-two' }), e('div', { className: 'shape shape-three' }), e('div', { className: 'hero-card' }, e('small', null, 'আজকের ডিল'), e('strong', null, 'স্মার্ট', e('br'), 'শপিং'), e('span', null, 'নতুন কিছু আবিষ্কার করুন')))
                                   ),
                           e('section', { className: 'trust-row container' }, ...[['🚚', 'দ্রুত ডেলিভারি', 'ঢাকা ও সারাদেশে'], ['✓', 'নির্বাচিত পণ্য', 'ভেরিফাইড কোয়ালিটি'], ['৳', 'ক্যাশ অন ডেলিভারি', 'অর্ডারের সময় পেমেন্ট'], ['↺', 'সহজ রিটার্ন', 'সহযোগিতাপূর্ণ সাপোর্ট']].map(item => e('div', { key: item[1] }, e('b', null, item[0]), e('span', null, e('strong', null, item[1]), e('small', null, item[2]))))),
                           e('section', { className: 'section container' }, e('div', { className: 'section-heading' }, e('div', null, e('p', { className: 'eyebrow orange' }, 'ZUNAID MART PICKS'), e('h2', null, 'আজকের জনপ্রিয় পণ্য')), link('/products', 'সবগুলো দেখুন →')), productGrid),
                           e('section', { className: 'promo container' }, e('div', null, e('p', { className: 'eyebrow' }, 'আপনার জন্য সিলেক্টেড'), e('h2', null, 'ছোট দামে', e('br'), e('strong', null, 'বড় সুবিধা')), e('p', null, 'প্রতিদিনের প্রয়োজনীয় জিনিস এখন আরও সহজে।'), link('/products', 'শপিং শুরু করুন →', 'dark-button')), e('div', { className: 'promo-circles' }, e('span', null, '৳'), e('span', null, '✦'), e('span', null, '+')))
                         ),
                   e('footer', { id: 'contact' }, e('div', { className: 'container footer-inner' }, e('div', null, e(Link, { href: '/', className: 'brand footer-brand' }, e('span', { className: 'brand-mark' }, 'Z'), e('span', null, e('strong', null, 'ZUNAID'), e('small', null, 'MART'))), e('p', null, 'বাংলাদেশের জন্য সহজ ও বিশ্বস্ত অনলাইন শপিং।')), e('div', null, e('h3', null, 'সহায়তা'), e('p', null, 'যোগাযোগ করুন', e('br'), 'COD ও ডেলিভারি', e('br'), 'রিটার্ন নীতি')), e('div', null, e('h3', null, 'আমাদের সাথে থাকুন'), e('p', null, 'Facebook · Instagram', e('br'), '© 2026 Zunaid Mart'))))
                 );
}
