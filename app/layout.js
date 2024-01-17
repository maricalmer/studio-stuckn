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
        <meta itemProp="name" content="Studio.Stuckn"></meta>
        <meta itemProp="description" content="Explore 3D artist Ronja Stucken's portfolio, showcasing expertise in digital fashion design, avatars, scene building, as well as proficiency in physical fashion design and pattern making."></meta>
        <meta itemProp="image" content="https://res.cloudinary.com/dq41jyzzc/image/upload/v1705505443/meta_img.png"></meta>
        <meta property="og:url" content="https://www.studiostuckn.com"></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:title" content="Studio.Stuckn"></meta>
        <meta property="og:description" content="Explore 3D artist Ronja Stucken's portfolio, showcasing expertise in digital fashion design, avatars, scene building, as well as proficiency in physical fashion design and pattern making."></meta>
        <meta property="og:image" content="https://res.cloudinary.com/dq41jyzzc/image/upload/v1705505443/meta_img.png"></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:title" content="Studio.Stuckn"></meta>
        <meta name="twitter:description" content="Explore 3D artist Ronja Stucken's portfolio, showcasing expertise in digital fashion design, avatars, scene building, as well as proficiency in physical fashion design and pattern making."></meta>
        <meta name="twitter:image" content="https://res.cloudinary.com/dq41jyzzc/image/upload/v1705505443/meta_img.png"></meta>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
