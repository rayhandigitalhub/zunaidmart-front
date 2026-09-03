import Link from 'next/link';
import Header from '../../../components/Header';
import { formatBDT, getProduct, stripHtml } from '../../../lib/woo';

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  if (!product) return <><Header /><main className="container empty-state product-not-found"><h1>পণ্যটি পাওয়া যায়নি</h1><Link href="/products" className="dark-button">সব পণ্য দেখুন</Link></main></>;
  const image = product.images?.[0]?.src;
  const sale = product.prices?.sale_price || product.prices?.price;
  const regular = product.prices?.regular_price;
  return <><Header /><main className="container detail-page"><div className="breadcrumb">হোম <span>›</span> পণ্য <span>›</span> {product.name}</div><div className="detail-grid"><div className="detail-image-panel">{image ? <img src={image} alt={product.name} /> : <div className="image-placeholder large">ZUNAID<br />MART</div>}</div><div className="detail-copy"><p className="eyebrow orange">ZUNAID MART PRODUCT</p><h1>{product.name}</h1><div className="detail-rating">★ <span>{product.average_rating && Number(product.average_rating) > 0 ? product.average_rating : 'নতুন পণ্য'}</span></div><div className="detail-price"><strong>{formatBDT(sale)}</strong>{regular && sale !== regular && <del>{formatBDT(regular)}</del>}</div><p className="detail-description">{stripHtml(product.short_description || product.description || 'এই পণ্যটি সম্পর্কে বিস্তারিত জানতে আমাদের সাথে যোগাযোগ করুন।')}</p><div className="quantity"><span>পরিমাণ</span><button>−</button><b>1</b><button>+</button></div><div className="detail-actions"><button className="dark-button">কার্টে যোগ করুন</button><button className="outline-button">♡ উইশলিস্ট</button></div><div className="detail-benefits"><span>🚚 আনুমানিক ডেলিভারি: ২–৫ দিন</span><span>💵 ক্যাশ অন ডেলিভারি available</span><span>↺ রিটার্ন নীতি প্রযোজ্য</span></div></div></div></main></>;
}
