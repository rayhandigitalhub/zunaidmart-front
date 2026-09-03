'use client';

import Link from 'next/link';

export default function LiveHero() {
  return (
    <section className="legacy-live-hero" aria-label="Zunaid Mart offer">
      <p className="eyebrow orange">ZUNAID MART PICKS</p>
      <h2>Smart deal of the day</h2>
      <p>Useful products at easy prices—discover them now.</p>
      <Link href="/products" className="dark-button">View all deals →</Link>
    </section>
  );
}
