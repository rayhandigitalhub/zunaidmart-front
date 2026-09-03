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
          try { const response = await fetch('/api/wc/cart', { cache: 'no-store' }); if (!response.ok) throw new Error('cart'); setCart(await response.json()); } catch { setError('কার্ট লোড করা যায়নি।'); } finally { setBusy(false); }
    }
    async function update(key: string, quantity: number) {
          if (quantity < 1) return;
          const response = await fetch('/api/wc/cart', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key, quantity }) });
          if (response.ok) setCart(await response.json());
    }
    useEffect(() => { load(); const handler = () => load(); window.addEventListener('zunaid-cart-updated', handler); return () => window.removeEventListener('zunaid-cart-updated', handler); }, []);
    const content = busy ? e('div', { className: 'empty-state' }, 'কার্ট লোড হচ্ছে…') : error ? e('div', { className: 'empty-state' }, error) : !cart?.items?.length ? e('div', { className: 'empty-state' }, e('h2', null, 'আপনার কার্ট খালি'), e('p', null, 'পছন্দের পণ্য কার্টে যোগ করুন।'), e(Link, { href: '/products', className: 'dark-button' }, 'শপিং শুরু করুন')) : e('div', { className: 'cart-layout' }, e('section', { className: 'cart-items' }, ...cart.items.map(item => e('article', { className: 'cart-item', key: item.key }, item.images?.[0]?.src ? e('img', { src: item.images[0].src, alt: item.name }) : e('div', { className: 'image-placeholder' }, 'ZUNAID')), e('div', { className: 'cart-item-copy' }, e('h2', null, item.name), e('p', null, money(item.prices?.price)), e('div', { className: 'quantity' }, e('button', { type: 'button', onClick: () => update(item.key, item.quantity - 1) }, '−'), e('b', null, String(item.quantity)), e('button', { type: 'button', onClick: () => update(item.key, item.quantity + 1) }, '+'))), e('strong', { className: 'cart-line-total' }, money(item.totals?.line_total)))), e('aside', { className: 'cart-summary' }, e('p', { className: 'eyebrow orange' }, 'ORDER SUMMARY'), e('h2', null, 'মোট: ' + money(cart.totals?.total_price)), e('p', null, 'ডেলিভারি চার্জ checkout-এ ঠিকানা অনুযায়ী গণনা হবে।'), e(Link, { href: '/checkout', className: 'dark-button' }, 'Checkout-এ যান'))));
    return e('div', null, e(Header), e('main', { className: 'container cart-page' }, e('div', { className: 'breadcrumb' }, 'হোম › কার্ট'), e('h1', null, 'আপনার শপিং কার্ট'), content));
}
