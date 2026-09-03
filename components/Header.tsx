import { createElement as e } from 'react';
import Link from 'next/link';
import ThemeControls from './ThemeControls';

const link = (href: string, text: string, className?: string) => e(Link, { href, className }, text);

export default function Header() {
  return e('header', { className: 'site-header' },
    e('div', { className: 'top-strip' }, e('div', { className: 'container top-inner' }, e('span', null, 'Easy online shopping across Bangladesh'), e('nav', { 'aria-label': 'Utility navigation' }, link('/products', 'All Products'), link('#delivery', 'Delivery Info'), link('#contact', 'Contact'), e(ThemeControls)))),
    e('div', { className: 'header-main container' },
      e(Link, { href: '/', className: 'brand', 'aria-label': 'Zunaid Mart homepage' }, e('span', { className: 'brand-mark' }, 'Z'), e('span', null, e('strong', null, 'ZUNAID'), e('small', null, 'MART'))),
      e('form', { className: 'search-form', action: '/products' }, e('input', { name: 'q', placeholder: 'What are you looking for?', 'aria-label': 'Search products' }), e('button', { type: 'submit', 'aria-label': 'Search' }, '⌕')),
      e('div', { className: 'header-actions' }, link('/products', '♡ Wishlist', 'action-link'), link('/cart', '🛒 Cart', 'action-link'))),
    e('div', { className: 'category-nav' }, e('div', { className: 'container category-inner' }, link('/products', '☰ Categories', 'category-all'), link('/products?q=new', 'New Arrivals'), link('/products?q=deal', "Today's Deals"), link('/products?q=home', 'Home & Living'), link('/products?q=fashion', 'Fashion'), link('/products?q=electronics', 'Electronics'), e('span', { className: 'delivery-note' }, '🚚 Fast delivery · Cash on Delivery')))
  );
}
