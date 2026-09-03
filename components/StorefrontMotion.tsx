'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const messages = [
  { kicker: 'SMART DEAL OF THE DAY', title: 'Everyday essentials, better prices', detail: 'Discover something new and add it to your cart.' },
  { kicker: 'ZUNAID MART PICKS', title: 'Home, fashion and tech in one place', detail: 'Cash on Delivery and fast delivery across Bangladesh.' },
  { kicker: 'LIMITED-TIME SELECTION', title: 'Small prices, big convenience', detail: "Explore today's picks before they are gone." },
];

export default function StorefrontMotion({ productCount = 0 }: { productCount?: number }) {
  const [active, setActive] = useState(0);
  const [seconds, setSeconds] = useState(3 * 60 * 60 + 47 * 60 + 12);
  const [notice, setNotice] = useState("Explore today's deals");
  useEffect(() => {
    const rotation = window.setInterval(() => setActive((value) => (value + 1) % messages.length), 4200);
    const countdown = window.setInterval(() => setSeconds((value) => value > 0 ? value - 1 : 3 * 60 * 60 + 47 * 60 + 12), 1000);
    return () => { window.clearInterval(rotation); window.clearInterval(countdown); };
  }, []);
  const hour = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const minute = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const second = String(seconds % 60).padStart(2, '0');
  const current = messages[active];
  return <>
    <div className="live-offer-bar" role="status"><span className="live-dot">●</span><strong>LIVE OFFER</strong><span>{current.kicker} — {current.detail}</span><span className="offer-clock">Ends in {hour}:{minute}:{second}</span><span className="live-scan"><i /> LIVE MODE</span><Link href="/products">Shop now →</Link></div>
    <div className="shop-shortcuts container" aria-label="Quick categories">
      <Link href="/products?q=new"><span>✦</span> New arrivals</Link><Link href="/products?q=deal"><span>%</span> Today's deals</Link><Link href="/products?q=home"><span>⌂</span> Home & Living</Link><Link href="/products?q=fashion"><span>◌</span> Fashion</Link><Link href="/products?q=electronics"><span>⌁</span> Electronics</Link><span className="catalog-pulse"><i /> {productCount || 'Many'} products live now</span>
    </div>
    <section className="motion-banner container" aria-live="polite"><div className="motion-copy"><p className="eyebrow orange">{current.kicker}</p><h2>{current.title}</h2><p>{current.detail}</p></div><div className="motion-side"><div className="motion-energy" aria-hidden="true"><i /><i /><i /><i /><i /></div><span className="source-note">Source catalog · zunaidmart.com</span><div className="motion-dots">{messages.map((_, index) => <button key={index} aria-label={'Slide ' + (index + 1)} className={index === active ? 'active' : ''} onClick={() => setActive(index)} />)}</div></div><button className="motion-notice" onClick={() => setNotice('Preview the product before adding it ✓')}>{notice}</button></section>
  </>;
}
