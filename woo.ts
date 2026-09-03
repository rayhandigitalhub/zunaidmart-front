export type WooImage = { id: number; src: string; thumbnail?: string; alt?: string };

export type WooProduct = {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  type: string;
  on_sale: boolean;
  prices: {
    price: string;
    regular_price: string;
    sale_price: string;
    currency_symbol: string;
  };
  images: WooImage[];
  short_description?: string;
  description?: string;
  average_rating?: string;
  review_count?: number;
  categories?: { id: number; name: string; slug: string }[];
};

const API = process.env.WOOCOMMERCE_STORE_API || 'https://zunaidmart.com/wp-json/wc/store/v1';

async function wooFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${API}${path}`, { next: { revalidate: 120 } });
  if (!response.ok) throw new Error(`WooCommerce API error: ${response.status}`);
  return response.json();
}

export async function getProducts(options: { search?: string; perPage?: number } = {}) {
  const params = new URLSearchParams({ per_page: String(options.perPage ?? 24) });
  if (options.search) params.set('search', options.search);
  return wooFetch<WooProduct[]>(`/products?${params.toString()}`);
}

export async function getProduct(identifier: string) {
  const id = identifier.match(/^\d+/)?.[0];
  if (id) {
    const products = await wooFetch<WooProduct[]>(`/products?include=${id}`);
    return products[0] ?? null;
  }
  const products = await wooFetch<WooProduct[]>(`/products?slug=${encodeURIComponent(identifier)}`);
  return products[0] ?? null;
}

export function formatBDT(value?: string) {
  if (!value) return 'Contact us for price';
  return `৳ ${Number(value).toLocaleString('en-BD')}`;
}

export function stripHtml(value = '') {
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}
