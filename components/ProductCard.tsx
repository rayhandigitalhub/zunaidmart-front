import Link from 'next/link';
import { formatBDT, WooProduct } from '../lib/woo';

export default function ProductCard({ product }: { product: WooProduct }) {
    const image = product.images?.[0]?.src;
    const regular = product.prices?.regular_price;
    const sale = product.prices?.sale_price || product.prices?.price;
    const discount = regular && sale && Number(regular) > Number(sale) ? Math.round((1 - Number(sale) / Number(regular)) * 100) : 0;
    return <article className="product-card">
        <Link href={`/products/${product.id}-${product.slug}`} className="product-image-wrap">
          {discount > 0 && <span className="discount-badge">-{discount}%</span>span>}
          {image ? <img src={image} alt={product.name} className="product-image" /> : <div className="image-placeholder">ZUNAID<br />MART</div>div>}
        </Link>Link>
        <div className="product-info"><Link href={`/products/${product.id}-${product.slug}`} className="product-name">{product.name}</Link>Link>
              <div className="rating">★ <span>{product.average_rating && Number(product.average_rating) > 0 ? product.average_rating : 'নতুন'} {product.review_count ? `(${product.review_count})` : ''}</span>span></div>div>
              <div className="price-row"><strong>{formatBDT(sale)}</strong>strong>{discount > 0 && <del>{formatBDT(regular)}</del>del>}</div>div>
              <Link href={`/products/${product.id}-${product.slug}`} className="view-button">বিস্তারিত দেখুন</Link>Link>
        </div>div>
    </article>article>;
}
</article>
