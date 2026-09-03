'use client';

import { createElement as e, useEffect, useState } from 'react';
import Link from 'next/link';

export default function CartLink() {
    const [count, setCount] = useState(0);
    async function refresh() { try { const response = await fetch('/api/wc/cart', { cache: 'no-store' }); if (response.ok) { const data = await response.json(); setCount(Number(data.items_count || data.items?.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0) || 0)); } } catch { setCount(0); } }
    useEffect(() => { refresh(); const handler = () => refresh(); window.addEventListener('zunaid-cart-updated', handler); return () => window.removeEventListener('zunaid-cart-updated', handler); }, []);
    return e(Link, { href: '/cart', className: 'action-link cart-link' }, '🛒 Cart', count > 0 ? e('b', { className: 'cart-count', 'aria-label': count + ' items' }, String(count)) : null);
}
