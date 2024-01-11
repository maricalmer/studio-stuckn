import "../public/stylesheets/globals.css";
import localFont from 'next/font/local'
const quella = localFont({src: '../public/fonts/Quella.otf', variable: '--quella'})
const helvetica = localFont({src: '../public/fonts/Helvetica.otf', variable: '--helvetica'})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${quella.variable} ${helvetica.variable}`}>
      <head>
        <title>Studio.Stuckn</title>
        <meta name="description" content="Explore 3D artist Ronja Stucken's portfolio, showcasing expertise in digital fashion design, avatars, scene building, as well as proficiency in physical fashion design and pattern making."></meta>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
