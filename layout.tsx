import './globals.css';

export const metadata = {
  title: 'Zunaid Mart | সহজ অনলাইন শপিং',
  description: 'বাংলাদেশের জন্য সহজ ও বিশ্বস্ত অনলাইন শপিং।'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="bn"><body>{children}</body></html>;
}
