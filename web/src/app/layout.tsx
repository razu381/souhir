import type { Metadata } from 'next';
import './sf-base.css';
import './sf-detail.css';

export const metadata: Metadata = {
  title: 'Dar SF — Content Demonstration',
  description:
    'Portfolio and journal templates rendered from the Dar SF content editor.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="sfd-page">{children}</body>
    </html>
  );
}
