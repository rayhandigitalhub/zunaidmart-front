import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import { getProducts, WooProduct } from '../../lib/woo';

export default async function ProductsPage({ searchParams }: { searchParams: { q?: string } }) {
    const q = searchParams?.q || '';
    let products: WooProduct[] = [];
    let failed = false;
    try { products = await getProducts({ perPage: 48, search: q }); } catch { failed = true; }
    return <><Header /><main className="listing-page container"><div className="breadcrumb">হোম <span>›</span>span> {q ? `“${q}”` : 'সব পণ্য'}</div>div><div className="listing-layout"><aside className="filters"><h3>ফিল্টার</h3>h3><div className="filter-group"><strong>ক্যাটাগরি</strong>strong><label><input type="checkbox" /> ঘর ও জীবন</label>label><label><input type="checkbox" /> ফ্যাশন</label>label><label><input type="checkbox" /> ইলেকট্রনিক্স</label>label><label><input type="checkbox" /> বিউটি ও কেয়ার</label>label></div>div><div className="filter-group"><strong>দাম</strong>strong><label><input type="checkbox" /> ৳ ০–৫০০</label>label><label><input type="checkbox" /> ৳ ৫০০–১,০০০</label>label><label><input type="checkbox" /> ৳ ১,০০০+</label>label></div>div></aside>aside><section className="listing-content"><div className="listing-top"><div><p className="eyebrow orange">ZUNAID MART CATALOG</p>p><h1>{q ? `“${q}” এর ফলাফল` : 'সব পণ্য'}</h1>h1><span>{products.length}টি পণ্য পাওয়া গেছে</span>span></div>div><select aria-label="সাজান"><option>সাজান: জনপ্রিয়</option>option><option>দাম: কম থেকে বেশি</option>option><option>নতুন পণ্য</option>option></select>select></div>div>{failed ? <div className="empty-state">পণ্য লোড করা যায়নি। কিছুক্ষণ পর আবার চেষ্টা করুন।</div>div> : products.length ? <div className="product-grid">{products.map(product => <ProductCard product={product} key={product.id} />)}</div>div> : <div className="empty-state"><h2>কোনো পণ্য পাওয়া যায়নি</h2>h2><p>অন্য কোনো শব্দ দিয়ে সার্চ করে দেখুন।</p>p></div>div>}</section>section></div>div></main>main></>>;
}
</>
