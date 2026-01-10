import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  title: 'GitConfig Pro - Ultimate Git Configuration Generator',
  description: 'Generate .gitignore, .gitattributes, .editorconfig, and .dockerignore files instantly. Smart detection and 20+ technologies.',
  openGraph: {
     title: 'GitConfig Pro - Ultimate Git Config Generator',
     description: 'The smartest way to generate Git configuration files for your projects.',
     type: 'website',
  },
  twitter: {
     card: 'summary_large_image',
     site: '@gitconfigpro',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/geist@1.2.0/dist/fonts/geist-sans/style.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/geist@1.2.0/dist/fonts/geist-mono/style.min.css" />
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚙️</text></svg>" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
