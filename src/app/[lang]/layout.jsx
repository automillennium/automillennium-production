 import { i18n } from '../lib/i18n';
import { getDictionary } from '../lib/dictionaries';
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsappWidget from "../components/WhatsappWidget";


export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <>


      <NavBar dictionary={dictionary.nav} lang={lang} />
      
      <main id="main-content" role="main">
        {children}
      </main>
      
      <Footer dictionary={dictionary.footer} lang={lang} />
      <WhatsappWidget />
    </>
  );
}