import About from "./components/About";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import OurBusiness from "./components/OurBusiness";

// Homepage specific metadata (overrides layout metadata)
export const metadata = {
  title: "Your Company Name - Primary Tagline & Main Service",
  description: "Compelling 150-160 character description of your business, main services, and unique value proposition. Include primary keywords naturally.",
  keywords: "primary keyword, secondary keyword, location-based keyword, service keyword",
  openGraph: {
    title: "Your Company Name - Primary Tagline",
    description: "Compelling description for social media sharing",
    url: "https://yourdomain.com",
    siteName: "Your Company Name",
    images: [
      {
        url: '/og-homepage.jpg',
        width: 1200,
        height: 630,
        alt: 'Your Company Name - Primary Service',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Your Company Name - Primary Tagline",
    description: "Compelling description for Twitter",
    images: ['/twitter-homepage.jpg'],
  },
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  // Structured data for homepage
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Your Company Name',
    description: 'Your compelling business description',
    url: 'https://yourdomain.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://yourdomain.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  const organizationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Your Company Name',
    alternateName: 'Your Brand Name',
    url: 'https://yourdomain.com',
    logo: 'https://yourdomain.com/logo.png',
    description: 'Your detailed company description',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Main St',
      addressLocality: 'City',
      addressRegion: 'State',
      postalCode: '12345',
      addressCountry: 'US'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-123-456-7890',
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: 'en'
    },
    sameAs: [
      'https://facebook.com/yourpage',
      'https://linkedin.com/company/yourcompany',
      'https://twitter.com/yourcompany',
      'https://instagram.com/yourcompany'
    ]
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
      />
      
      {/* Main Content with Semantic Structure */}
      <div className="relative min-h-screen w-full overflow-x-hidden">
        {/* Hero Section - Should contain your main H1 */}
        <section aria-label="Main hero section">
          <Hero />
        </section>

        {/* About Section */}
        <section id="about" aria-label="About us" className="scroll-mt-20">
          <About />
        </section>

        {/* Our Business Section */}
        <section id="business" aria-label="Our business" className="scroll-mt-20">
          <OurBusiness />
        </section>

        {/* Features/Services Section */}
        <section id="features" aria-label="Our features" className="scroll-mt-20">
          <Features />
        </section>

        {/* Story/Testimonials Section */}
        <section id="story" aria-label="Our story" className="scroll-mt-20">
          <Story />
        </section>

        {/* Contact Section */}
        <section id="contact" aria-label="Contact us" className="scroll-mt-20">
          <Contact />
        </section>
      </div>
    </>
  );
}