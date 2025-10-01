import "./globals.css";
import 'tailwindcss/tailwind.css';
import 'react-whatsapp-widget/dist/index.css';



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        {children}
      </body>
    </html>
  );
}
