'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = { productId: number; quantity?: number };

export default function BuyNowButton({ productId, quantity = 1 }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function buyNow() {
    setBusy(true); setError('');
    try {
      const response = await fetch('/api/wc/cart/add-item', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: productId, quantity }) });
      if (!response.ok) throw new Error('checkout');
      window.dispatchEvent(new Event('zunaid-cart-updated'));
      router.push('/checkout');
    } catch { setError('Could not prepare checkout. Please try again.'); setBusy(false); }
  }
  return <span className="buy-now-wrap"><button type="button" className="buy-now-button" onClick={buyNow} disabled={busy}>{busy ? 'Preparing checkout…' : 'Buy now →'}</button>{error ? <span className="buy-error" role="alert">{error}</span> : null}</span>;
}
