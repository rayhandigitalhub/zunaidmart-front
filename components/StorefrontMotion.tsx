'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const messages = [
  { kicker: 'আজকের স্মার্ট ডিল', title: 'দরকারি পণ্য, সহজ দামে', detail: 'নতুন পছন্দ আবিষ্কার করুন এবং কার্টে রাখুন।' },
  { kicker: 'Zunaid Mart Picks', title: 'ঘর, ফ্যাশন ও টেক—এক জায়গায়', detail: 'বাংলাদেশজুড়ে COD ও দ্রুত ডেলিভারি।' },
  { kicker: 'সীমিত সময়ের সিলেকশন', title: 'ছোট দামে বড় সুবিধা', detail: 'আজকের নির্বাচিত পণ্যগুলো আগে দেখে নিন।' },
];

export default function StorefrontMotion({ productCount = 0 }: { productCount?: number }) {
  const [active, setActive] = useState(0);
  const [seconds, setSeconds] = useState(3 * 60 * 60 + 47 * 60 + 12);
  const [notice, setNotice] = useState('আজকের অফার দেখুন');

  useEffect(() => {
    const rotation = window.setInterval(() => setActive((value) => (value + 1) % messages.length), 4200);
    const countdown = window.setInterval(() => setSeconds((value) => value > 0 ? value - 1 : 3 * 60 * 60 + 47 * 60 + 12), 1000);
    return () => { window.clearInterval(rotation); window.clearInterval(countdown); };
  }, []);

  const hour = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const minute = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const second = String(seconds % 60).padStart(2, '0');
  const current = messages[active];

  return (
    <>
      <div className="live-offer-bar" role="status">
        <span className="live-dot">●</span><strong>LIVE OFFER</strong><span>{current.kicker} — {current.detail}</span>
        <span className="offer-clock">শেষ হতে {hour}:{minute}:{second}</span>
        <Link href="/products">এখনই দেখুন →</Link>
      </div>
      <div className="shop-shortcuts container" aria-label="দ্রুত ক্যাটাগরি">
        <Link href="/products?q=নতুন"><span>✦</span> নতুন পণ্য</Link>
        <Link href="/products?q=অফার"><span>%</span> আজকের অফার</Link>
        <Link href="/products?q=ঘর"><span>⌂</span> ঘর ও জীবন</Link>
        <Link href="/products?q=ফ্যাশন"><span>◌</span> ফ্যাশন</Link>
        <Link href="/products?q=ইলেকট্রনিক্স"><span>⌁</span> ইলেকট্রনিক্স</Link>
        <span className="catalog-pulse"><i /> {productCount || 'অনেক'} পণ্য এখন দেখা যাচ্ছে</span>
      </div>
      <section className="motion-banner container" aria-live="polite">
        <div><p className="eyebrow orange">{current.kicker}</p><h2>{current.title}</h2><p>{current.detail}</p></div>
        <div className="motion-dots">{messages.map((_, index) => <button key={index} aria-label={'স্লাইড ' + (index + 1)} className={index === active ? 'active' : ''} onClick={() => setActive(index)} />)}</div>
        <button className="motion-notice" onClick={() => setNotice('কার্টে যোগ করার আগে পণ্যটি দেখে নিন ✓')}>{notice}</button>
      </section>
    </>
  );
}
