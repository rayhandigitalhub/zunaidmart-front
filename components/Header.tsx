import { createElement as e } from 'react';
import Link from 'next/link';

const link = (href: string, text: string, className?: string) => e(Link, { href, className }, text);

export default function Header() {
      return e('header', { className: 'site-header' },
                   e('div', { className: 'top-strip' }, e('div', { className: 'container top-inner' },
                                                                e('span', null, 'বাংলাদেশজুড়ে সহজ অনলাইন শপিং'),
                                                                e('nav', { 'aria-label': 'সাহায্য লিংক' }, link('/products', 'সব পণ্য'), link('#delivery', 'ডেলিভারি তথ্য'), link('#contact', 'যোগাযোগ'))
                                                              )),
                   e('div', { className: 'header-main container' },
                           e(Link, { href: '/', className: 'brand', 'aria-label': 'Zunaid Mart হোমপেজ' }, e('span', { className: 'brand-mark' }, 'Z'), e('span', null, e('strong', null, 'ZUNAID'), e('small', null, 'MART'))),
                           e('form', { className: 'search-form', action: '/products' }, e('input', { name: 'q', placeholder: 'আপনি কী খুঁজছেন?', 'aria-label': 'পণ্য খুঁজুন' }), e('button', { type: 'submit', 'aria-label': 'সার্চ' }, '⌕')),
                           e('div', { className: 'header-actions' }, link('/products', '♡ উইশলিস্ট', 'action-link'), link('#cart', '🛒 কার্ট', 'action-link'))
                         ),
                   e('div', { className: 'category-nav' }, e('div', { className: 'container category-inner' },
                                                                   link('/products', '☰ সব ক্যাটাগরি', 'category-all'), link('/products?q=নতুন', 'নতুন পণ্য'), link('/products?q=অফার', 'আজকের অফার'), link('/products?q=ঘর', 'ঘর ও জীবন'), link('/products?q=ফ্যাশন', 'ফ্যাশন'), link('/products?q=ইলেকট্রনিক্স', 'ইলেকট্রনিক্স'), e('span', { className: 'delivery-note' }, '🚚 দ্রুত ডেলিভারি · COD available')
                                                                 ))
                 );
}
