'use client';

import { createElement, useState } from 'react';

type Props = { productId: number; quantity?: number; compact?: boolean };

export default function AddToCartButton({ productId, quantity = 1, compact = false }: Props) {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    async function addToCart() {
          setStatus('loading');
          try {
                  const response = await fetch('/api/wc/cart/add-item', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ id: productId, quantity })
                  });
                  if (!response.ok) throw new Error('cart');
                  setStatus('success');
                  window.dispatchEvent(new Event('zunaid-cart-updated'));
                  window.setTimeout(() => setStatus('idle'), 1800);
          } catch {
                  setStatus('error');
                  window.setTimeout(() => setStatus('idle'), 2200);
          }
    }
    const label = status === 'loading' ? 'Adding…' : status === 'success' ? 'Added to cart ✓' : status === 'error' ? 'Try again' : compact ? 'Add to cart' : 'Add to cart';
    return createElement('button', { type: 'button', className: compact ? 'add-button compact' : 'dark-button add-button', onClick: addToCart, disabled: status === 'loading' }, label);
}
