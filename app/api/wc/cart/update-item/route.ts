import { NextRequest, NextResponse } from 'next/server';

const API = process.env.WOOCOMMERCE_STORE_API || 'https://zunaidmart.com/wp-json/wc/store/v1';

function cookiesFrom(response: Response) {
    const headers = response.headers as Headers & { getSetCookie?: () => string[] };
    return typeof headers.getSetCookie === 'function' ? headers.getSetCookie() : (response.headers.get('set-cookie') ? [response.headers.get('set-cookie') as string] : []);
}

export async function POST(request: NextRequest) {
    const input = await request.json();
    const incoming = request.headers.get('cookie') || '';
    const cartResponse = await fetch(API + '/cart', { headers: { cookie: incoming }, cache: 'no-store' });
    const nonce = cartResponse.headers.get('nonce') || '';
    const fresh = cookiesFrom(cartResponse).map(cookie => cookie.split(';')[0]).join('; ');
    const cookie = [incoming, fresh].filter(Boolean).join('; ');
    const response = await fetch(API + '/cart/update-item', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Nonce': nonce, cookie }, body: JSON.stringify(input), cache: 'no-store' });
    const data = await response.json();
    const output = NextResponse.json(data, { status: response.status });
    for (const cookieValue of [...cookiesFrom(cartResponse), ...cookiesFrom(response)]) output.headers.append('set-cookie', cookieValue);
    return output;
}
