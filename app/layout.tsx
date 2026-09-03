import { createElement } from 'react';
import './globals.css';
import CursorFX from '../components/CursorFX';

export const metadata = { title: 'Zunaid Mart | Smart Shopping', description: 'Simple, trusted online shopping for Bangladesh.' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return createElement('html', { lang: 'en' }, createElement('body', null, createElement(CursorFX), children));
}
