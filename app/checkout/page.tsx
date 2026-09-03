'use client';

import { createElement as e, useState, type ChangeEvent, type FormEvent } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';

type FormState = { name: string; email: string; phone: string; address: string; city: string };

export default function CheckoutPage() {
      const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', address: '', city: 'Dhaka' });
      const [busy, setBusy] = useState(false);
      const [message, setMessage] = useState('');
      const [success, setSuccess] = useState(false);

  function change(field: keyof FormState, value: string) { setForm(current => ({ ...current, [field]: value })); }

  async function submit(event: FormEvent<HTMLFormElement>) {
          event.preventDefault();
          setBusy(true); setMessage(''); setSuccess(false);
          const address = { first_name: form.name, last_name: '', address_1: form.address, address_2: '', city: form.city, state: 'BD-13', postcode: '', country: 'BD', email: form.email, phone: form.phone };
          try {
                    const response = await fetch('/api/wc/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ billing_address: address, shipping_address: address, payment_method: 'cod', payment_data: [], customer_note: '' }) });
                    const data = await response.json();
                    if (!response.ok) throw new Error(data?.message || 'Checkout could not be completed.');
                    setSuccess(true); setMessage('Order placed successfully. Order number: ' + (data.order_id || data.order_key || 'নিশ্চিত'));
          } catch (error) { setMessage(error instanceof Error ? error.message : 'Checkout could not be completed.'); }
          finally { setBusy(false); }
  }

  function inputField(name: keyof FormState, label: string, type = 'text') {
          const onChange = (event: ChangeEvent<HTMLInputElement>) => change(name, event.target.value);
          return e('label', { className: 'checkout-field', key: name }, e('span', null, label), e('input', { type, value: form[name], required: true, onChange }));
  }

  const fields = [inputField('name', 'Full name'), inputField('email', 'Email', 'email'), inputField('phone', 'Phone number', 'tel'), inputField('city', 'City')];
      const addressField = e('label', { className: 'checkout-field full', key: 'address' }, e('span', null, 'Full address'), e('textarea', { value: form.address, required: true, rows: 4, onChange: (event: ChangeEvent<HTMLTextAreaElement>) => change('address', event.target.value) }));
      const button = e('button', { className: 'dark-button', type: 'submit', disabled: busy }, busy ? 'Placing order…' : 'Confirm COD order');
      const feedback = message ? e('div', { className: success ? 'checkout-success' : 'checkout-error' }, message) : null;
      const formElement = e('form', { className: 'checkout-form', onSubmit: submit }, ...fields, addressField, button, feedback);
      return e('div', null, e(Header), e('main', { className: 'container checkout-page' }, e('div', { className: 'breadcrumb' }, e(Link, { href: '/cart' }, 'Home › Cart'), ' › Checkout'), e('h1', null, 'Checkout'), e('p', { className: 'checkout-note' }, 'Cash on Delivery (COD) — Pay when your order arrives.'), formElement));
}
