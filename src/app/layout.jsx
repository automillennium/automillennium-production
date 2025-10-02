import "./globals.css";
import 'tailwindcss/tailwind.css';
import 'react-whatsapp-widget/dist/index.css';
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsappWidget from "./components/WhatsappWidget";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={``}
      >
              <NavBar />

        {children}
              <Footer />
      <WhatsappWidget/>
      </body>
    </html>
  );
}
