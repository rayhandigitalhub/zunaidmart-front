'use client';

import Link from 'next/link';

export default function LiveHero() {
  return (
    <section className="legacy-live-hero" aria-label="Zunaid Mart offer">
      <p className="eyebrow orange">ZUNAID MART PICKS</p>
      <h2>আজকের স্মার্ট ডিল</h2>
      <p>দরকারি পণ্য, সহজ দামে—এখনই দেখে নিন।</p>
      <Link href="/products" className="dark-button">সব অফার দেখুন →</Link>
    </section>
  );
}
