import Link from 'next/link';

export default function Header() {
    return (
          <header className="site-header">
                <div className="top-strip">
                        <div className="container top-inner">
                                  <span>বাংলাদেশজুড়ে সহজ অনলাইন শপিং</span>span>
                                  <nav aria-label="সাহায্য লিংক"><Link href="/products">সব পণ্য</Link>Link><Link href="#delivery">ডেলিভারি তথ্য</Link>Link><Link href="#contact">যোগাযোগ</Link>Link></nav>nav>
                        </div>div>
                </div>div>
                <div className="header-main container">
                        <Link href="/" className="brand" aria-label="Zunaid Mart হোমপেজ">
                                  <span className="brand-mark">Z</span>span><span><strong>ZUNAID</strong>strong><small>MART</small>small></span>span>
                        </Link>Link>
                        <form className="search-form" action="/products">
                                  <input name="q" placeholder="আপনি কী খুঁজছেন?" aria-label="পণ্য খুঁজুন" />
                                  <button type="submit" aria-label="সার্চ">⌕</button>button>
                        </form>form>
                        <div className="header-actions"><Link href="/products" className="action-link">♡<span>উইশলিস্ট</span>span></Link>Link><Link href="#cart" className="action-link">🛒<span>কার্ট</span>span></Link>Link></div>div>
                </div>div>
                <div className="category-nav"><div className="container category-inner"><Link href="/products" className="category-all">☰ সব ক্যাটাগরি</Link>Link><Link href="/products?q=নতুন">নতুন পণ্য</Link>Link><Link href="/products?q=অফার">আজকের অফার</Link>Link><Link href="/products?q=ঘর">ঘর ও জীবন</Link>Link><Link href="/products?q=ফ্যাশন">ফ্যাশন</Link>Link><Link href="/products?q=ইলেকট্রনিক্স">ইলেকট্রনিক্স</Link>Link><span className="delivery-note">🚚 দ্রুত ডেলিভারি · COD available</span>span></div>div></div>div>
          </header>header>
        );
}
</header>
