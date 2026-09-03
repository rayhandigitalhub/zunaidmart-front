import { NextRequest, NextResponse } from 'next/server';

const API = process.env.WOOCOMMERCE_STORE_API || 'https://zunaidmart.com/wp-json/wc/store/v1';

function setForwardedCookies(target: NextResponse, response: Response) {
    const headers = response.headers as Headers & { getSetCookie?: () => string[] };
    const cookies = typeof headers.getSetCookie === 'function' ? headers.getSetCookie() : (response.headers.get('set-cookie') ? [response.headers.get('set-cookie') as string] : []);
    for (const cookie of cookies) target.headers.append('set-cookie', cookie);
}

function cookiePairs(response: Response) {
    const headers = response.headers as Headers & { getSetCookie?: () => string[] };
    const cookies = typeof headers.getSetCookie === 'function' ? headers.getSetCookie() : (response.headers.get('set-cookie') ? [response.headers.get('set-cookie') as string] : []);
    return cookies.map(cookie => cookie.split(';')[0]).join('; ');
}

export async function GET(request: NextRequest) {
    const response = await fetch(API + '/cart', { headers: { cookie: request.headers.get('cookie') || '' }, cache: 'no-store' });
    const data = await response.json();
    const output = NextResponse.json(data, { status: response.status });
    const nonce = response.headers.get('nonce');
    if (nonce) output.headers.set('x-wc-nonce', nonce);
    setForwardedCookies(output, response);
    return output;
}

export async function POST(request: NextRequest) {
    const input = await request.json();
    const cartResponse = await fetch(API + '/cart', { headers: { cookie: request.headers.get('cookie') || '' }, cache: 'no-store' });
    const nonce = cartResponse.headers.get('nonce') || '';
    const incoming = request.headers.get('cookie') || '';
    const fresh = cookiePairs(cartResponse);
    const cookie = [incoming, fresh].filter(Boolean).join('; ');
    const response = await fetch(API + '/cart/add-item', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Nonce': nonce, cookie }, body: JSON.stringify(input), cache: 'no-store' });
    const data = await response.json();
    const output = NextResponse.json(data, { status: response.status });
    const responseNonce = response.headers.get('nonce');
    if (responseNonce) output.headers.set('x-wc-nonce', responseNonce);
    setForwardedCookies(output, cartResponse);
    setForwardedCookies(output, response);
    return output;
}
