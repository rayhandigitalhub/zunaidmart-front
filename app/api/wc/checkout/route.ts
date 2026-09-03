import { NextRequest, NextResponse } from 'next/server';

const API = process.env.WOOCOMMERCE_STORE_API || 'https://zunaidmart.com/wp-json/wc/store/v1';

function cookiesFrom(response: Response) {
    const headers = response.headers as Headers & { getSetCookie?: () => string[] };
    const cookies = typeof headers.getSetCookie === 'function' ? headers.getSetCookie() : (response.headers.get('set-cookie') ? [response.headers.get('set-cookie') as string] : []);
    return cookies;
}

function appendCookies(target: NextResponse, response: Response) {
    for (const cookie of cookiesFrom(response)) target.headers.append('set-cookie', cookie);
}

export async function POST(request: NextRequest) {
    const input = await request.json();
    const incoming = request.headers.get('cookie') || '';
    const cartResponse = await fetch(API + '/cart', { headers: { cookie: incoming }, cache: 'no-store' });
    const nonce = cartResponse.headers.get('nonce') || '';
    const fresh = cookiesFrom(cartResponse).map(cookie => cookie.split(';')[0]).join('; ');
    const cookie = [incoming, fresh].filter(Boolean).join('; ');
    const response = await fetch(API + '/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Nonce': nonce, cookie }, body: JSON.stringify(input), cache: 'no-store' });
    const data = await response.json();
    const output = NextResponse.json(data, { status: response.status });
    const responseNonce = response.headers.get('nonce');
    if (responseNonce) output.headers.set('x-wc-nonce', responseNonce);
    appendCookies(output, cartResponse);
    appendCookies(output, response);
    return output;
}
