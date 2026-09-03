'use client';

import { createElement as e, useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';

type CartItem = { key: string; id: number; name: string; quantity: number; images?: { src: string }[]; prices?: { price: string }; totals?: { line_total: string } };
type Cart = { items: CartItem[]; totals?: { total_price: string; currency_symbol?: string }; items_count?: number };

function money(value?: string) { return value ? '৳ ' + Number(value).toLocaleString('en-BD') : '৳ 0'; }

export default function CartPage() {
        const [cart, setCart] = useState<Cart | null>(null);
        const [busy, setBusy] = useState(true);
        const [error, setError] = useState('');

  async function load() {
            setBusy(true);
            try {
                        const response = await fetch('/api/wc/cart', { cache: 'no-store' });
                        if (!response.ok) throw new Error('cart');
                        setCart(await response.json());
                        setError('');
            } catch { setError('Cart could not be loaded.'); }
            finally { setBusy(false); }
  }

  async function update(key: string, quantity: number) {
            if (quantity < 1) return;
            const response = await fetch('/api/wc/cart/update-item', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key, quantity }) });
            if (response.ok) setCart(await response.json());
  }

  useEffect(() => {
            load();
            const handler = () => load();
            window.addEventListener('zunaid-cart-updated', handler);
            return () => window.removeEventListener('zunaid-cart-updated', handler);
  }, []);

  if (busy) return e('div', null, e(Header), e('main', { className: 'container cart-page' }, e('div', { className: 'empty-state' }, 'Loading cart…')));
        if (error) return e('div', null, e(Header), e('main', { className: 'container cart-page' }, e('div', { className: 'empty-state' }, error)));
        if (!cart?.items?.length) return e('div', null, e(Header), e('main', { className: 'container cart-page' }, e('h1', null, 'Your shopping cart'), e('div', { className: 'empty-state' }, e('h2', null, 'Your cart is empty'), e('p', null, 'Add products you love to your cart.'), e(Link, { href: '/products', className: 'dark-button' }, 'Start shopping'))));

  const itemElements = cart.items.map(item => {
            const image = item.images?.[0]?.src ? e('img', { src: item.images[0].src, alt: item.name }) : e('div', { className: 'image-placeholder' }, 'ZUNAID');
            const controls = e('div', { className: 'quantity' }, e('button', { type: 'button', onClick: () => update(item.key, item.quantity - 1) }, '−'), e('b', null, String(item.quantity)), e('button', { type: 'button', onClick: () => update(item.key, item.quantity + 1) }, '+'));
            return e('article', { className: 'cart-item', key: item.key }, image, e('div', { className: 'cart-item-copy' }, e('h2', null, item.name), e('p', null, money(item.prices?.price)), controls), e('strong', { className: 'cart-line-total' }, money(item.totals?.line_total)));
  });
        const itemsSection = e('section', { className: 'cart-items' }, itemElements);
        const summary = e('aside', { className: 'cart-summary' }, e('p', { className: 'eyebrow orange' }, 'ORDER SUMMARY'), e('h2', null, 'Total: ' + money(cart.totals?.total_price)), e('p', null, 'Delivery fee is calculated at checkout based on your address.'), e(Link, { href: '/checkout', className: 'dark-button' }, 'Go to checkout'));
        const layout = e('div', { className: 'cart-layout' }, itemsSection, summary);
        return e('div', null, e(Header), e('main', { className: 'container cart-page' }, e('div', { className: 'breadcrumb' }, 'Home › Cart'), e('h1', null, 'Your shopping cart'), layout));
}
