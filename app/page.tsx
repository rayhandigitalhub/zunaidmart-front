import Link from 'next/link';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { getProducts, WooProduct } from '../lib/woo';

export default async function HomePage() {
    let products: WooProduct[] = [];
    try { products = await getProducts({ perPage: 12 }); } catch { products = []; }
    return <><Header /><main>
        <section className="hero container">
              <div className="hero-copy"><p className="eyebrow">ZUNAID MART · SMART SHOPPING</p>p><h1>প্রতিদিনের পছন্দ,<br /><em>সহজেই আপনার ঘরে</em>em></h1>h1><p className="hero-sub">বিশ্বস্ত পণ্য, সাশ্রয়ী দাম এবং বাংলাদেশের জন্য সহজ ডেলিভারি—সব এক জায়গায়।</p>p><Link href="/products" className="hero-button">এখনই শপ করুন <span>→</span>span></Link>Link><div className="hero-dots"><i className="active" /><i /><i /><i /></div>div></div>div>
              <div className="hero-art" aria-label="Zunaid Mart promotional banner"><div className="sun" /><div className="shape shape-one" /><div className="shape shape-two" /><div className="shape shape-three" /><div className="hero-card"><small>আজকের ডিল</small>small><strong>স্মার্ট<br />শপিং</strong>strong><span>নতুন কিছু আবিষ্কার করুন</span>span></div>div></div>div>
        </section>section>
        <section className="trust-row container"><div><b>🚚</b>b><span><strong>দ্রুত ডেলিভারি</strong>strong><small>ঢাকা ও সারাদেশে</small>small></span>span></div>div><div><b>✓</b>b><span><strong>নির্বাচিত পণ্য</strong>strong><small>ভেরিফাইড কোয়ালিটি</small>small></span>span></div>div><div><b>৳</b>b><span><strong>ক্যাশ অন ডেলিভারি</strong>strong><small>অর্ডারের সময় পেমেন্ট</small>small></span>span></div>div><div><b>↺</b>b><span><strong>সহজ রিটার্ন</strong>strong><small>সহযোগিতাপূর্ণ সাপোর্ট</small>small></span>span></div>div></section>section>
        <section className="section container"><div className="section-heading"><div><p className="eyebrow orange">ZUNAID MART PICKS</p>p><h2>আজকের জনপ্রিয় পণ্য</h2>h2></div>div><Link href="/products">সবগুলো দেখুন →</Link>Link></div>div>{products.length ? <div className="product-grid">{products.slice(0, 8).map(product => <ProductCard product={product} key={product.id} />)}</div>div> : <div className="empty-state">পণ্য লোড হচ্ছে বা সাময়িকভাবে পাওয়া যাচ্ছে না।</div>div>}</section>section>
        <section className="promo container"><div><p className="eyebrow">আপনার জন্য সিলেক্টেড</p>p><h2>ছোট দামে<br /><strong>বড় সুবিধা</strong>strong></h2>h2><p>প্রতিদিনের প্রয়োজনীয় জিনিস এখন আরও সহজে।</p>p><Link href="/products" className="dark-button">শপিং শুরু করুন →</Link>Link></div>div><div className="promo-circles"><span>৳</span>span><span>✦</span>span><span>+</span>span></div>div></section>section>
    </main>main><footer id="contact"><div className="container footer-inner"><div><Link href="/" className="brand footer-brand"><span className="brand-mark">Z</span>span><span><strong>ZUNAID</strong>strong><small>MART</small>small></span>span></Link>Link><p>বাংলাদেশের জন্য সহজ ও বিশ্বস্ত অনলাইন শপিং।</p>p></div>div><div><h3>সহায়তা</h3>h3><p>যোগাযোগ করুন<br />COD ও ডেলিভারি<br />রিটার্ন নীতি</p>p></div>div><div><h3>আমাদের সাথে থাকুন</h3>h3><p>Facebook · Instagram<br />© 2026 Zunaid Mart</p>p></div>div></div>div></footer>footer></>>;
}
</>
