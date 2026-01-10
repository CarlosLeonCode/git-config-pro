import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';
import Squares from '@/components/Squares';

export const metadata: Metadata = {
  title: {
    default: 'GitConfig Pro - Ultimate Git Configuration Generator',
    template: '%s | GitConfig Pro'
  },
  description: 'Generate .gitignore, .gitattributes, .editorconfig, and .dockerignore files instantly. Smart detection, 20+ technologies, and best practices for modern developers.',
  keywords: ['git', 'gitignore', 'gitattributes', 'editorconfig', 'dockerignore', 'generator', 'developer tools', 'configuration', 'devops', 'open source'],
  authors: [{ name: 'CarlosLeonCode', url: 'https://github.com/carlosleoncode/' }],
  creator: 'CarlosLeonCode',
  publisher: 'CarlosLeonCode',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://git-config-pro.carlosleoncode.dev'), // Replace with actual URL
  openGraph: {
     title: 'GitConfig Pro - Ultimate Git Config Generator',
     description: 'The smartest way to generate Git configuration files. Support for Node.js, Python, Ruby, Go, and more.',
     url: 'https://git-config-pro.carlosleoncode.dev',
     siteName: 'GitConfig Pro',
     images: [
       {
         url: 'https://git-config-pro.carlosleoncode.dev/og-image.png', // Assume user will add this
         width: 1200,
         height: 630,
         alt: 'GitConfig Pro Preview',
       }
     ],
     locale: 'en_US',
     type: 'website',
  },
  twitter: {
     card: 'summary_large_image',
     title: 'GitConfig Pro',
     description: 'Generate battle-tested boilerplate configurations for your next project.',
     site: '@gitconfigpro',
     creator: '@carlosleoncode',
     images: ['https://gitconfig-pro.vercel.app/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
        <Squares 
          speed={0.2} 
          squareSize={40}
          direction='diagonal' 
          borderColor='rgba(156, 163, 175, 0.15)'
          hoverFillColor='rgba(59, 130, 246, 0.05)'
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
