'use client';

import { createElement as e, useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';

type FormState = { name: string; email: string; phone: string; address: string; city: string };

export default function CheckoutPage() {
    const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', address: '', city: 'Dhaka' });
    const [busy, setBusy] = useState(false);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    function change(field: keyof FormState, value: string) { setForm(current => ({ ...current, [field]: value })); }
    async function submit(event: React.FormEvent<HTMLFormElement>) {
          event.preventDefault(); setBusy(true); setMessage(''); setSuccess(false);
          const address = { first_name: form.name, last_name: '', address_1: form.address, address_2: '', city: form.city, state: 'BD-13', postcode: '', country: 'BD', email: form.email, phone: form.phone };
          try {
                  const response = await fetch('/api/wc/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ billing_address: address, shipping_address: address, payment_method: 'cod', payment_data: [], customer_note: '' }) });
                  const data = await response.json();
                  if (!response.ok) throw new Error(data?.message || 'checkout');
                  setSuccess(true); setMessage('অর্ডার সফল হয়েছে। অর্ডার নম্বর: ' + (data.order_id || data.order_key || 'নিশ্চিত')); 
          } catch (error) { setMessage(error instanceof Error ? error.message : 'Checkout সম্পন্ন করা যায়নি।'); } finally { setBusy(false); }
    }
    const field = (name: keyof FormState, label: string, type = 'text', required = true) => e('label', { className: 'checkout-field' }, e('span', null, label), e('input', { type, value: form[name], required, onChange: (event: React.ChangeEvent<HTMLInputElement>) => change(name, event.target.value) }));
    return e('div', null, e(Header), e('main', { className: 'container checkout-page' }, e('div', { className: 'breadcrumb' }, e(Link, { href: '/cart' }, 'হোম › কার্ট'), ' › Checkout'), e('h1', null, 'Checkout'), e('p', { className: 'checkout-note' }, 'Cash on Delivery (COD) — ডেলিভারির সময় পেমেন্ট করুন।'), e('form', { className: 'checkout-form', onSubmit: submit }, field('name', 'আপনার নাম'), field('email', 'ইমেইল', 'email'), field('phone', 'ফোন নম্বর', 'tel'), field('city', 'শহর'), e('label', { className: 'checkout-field full' }, e('span', null, 'সম্পূর্ণ ঠিকানা'), e('textarea', { value: form.address, required: true, rows: 4, onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => change('address', event.target.value) })), e('button', { className: 'dark-button', type: 'submit', disabled: busy }, busy ? 'অর্ডার পাঠানো হচ্ছে…' : 'COD অর্ডার নিশ্চিত করুন'), message ? e('div', { className: success ? 'checkout-success' : 'checkout-error' }, message) : null));
}
