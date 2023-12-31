import Navigation from "@/components/Navigation";
import "../public/stylesheets/globals.css";
import localFont from 'next/font/local'
const quella = localFont({src: '../public/fonts/Quella.otf', variable: '--quella'})
const helvetica = localFont({src: '../public/fonts/Helvetica.otf', variable: '--helvetica'})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${quella.variable} ${helvetica.variable}`}>
      <head>
        <meta content="text/html; charset=UTF-8">
      </head>
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
