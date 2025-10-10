import "./globals.css";
import 'tailwindcss/tailwind.css';
import 'react-whatsapp-widget/dist/index.css';
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsappWidget from "./components/WhatsappWidget";

// Metadata for the entire site
export const metadata = {
  title: {
    default: "Your Company Name - Primary Service",
    template: "%s | Your Company Name"
  },
  description: "Default description of your business, services, and value proposition. Include primary keywords naturally.",
  keywords: "primary, keywords, for, your, business",
  authors: [{ name: "Your Company Name" }],
  creator: "Your Company Name",
  publisher: "Your Company Name",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://yourdomain.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourdomain.com",
    siteName: "Your Company Name",
    title: "Your Company Name - Primary Service",
    description: "Your compelling default description",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Your Company Name',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Your Company Name - Primary Service",
    description: "Your compelling default description",
    images: ['/twitter-image.jpg'],
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
  verification: {
    // Add your Google Search Console verification here
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html className="scroll-smooth">
      <head>
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon links */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon?<generated>" type="image/<generated>" sizes="<generated>" />
        <link rel="apple-touch-icon" href="/apple-touch-icon?<generated>" type="image/<generated>" sizes="<generated>" />
        
        {/* Additional meta tags */}
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}