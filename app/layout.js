import "../public/stylesheets/globals.css";
import localFont from 'next/font/local'

const quella = localFont({src: '../public/fonts/Quella.otf', variable: '--quella'})
const helvetica = localFont({src: '../public/fonts/Helvetica.woff2', variable: '--helvetica'});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${quella.variable} ${helvetica.variable}`}>
      <head>
        <title>Studio.Stuckn, 3D artist based in Berlin</title>
        <meta name="description" content="Discover 3D artist Ronja Stucken's portfolio, featuring expertise in digital fashion design, avatars, scene building, and physical fashion design."></meta>
        <meta itemProp="name" content="Studio.Stuckn"></meta>
        <meta itemProp="description" content="Discover 3D artist Ronja Stucken's portfolio, featuring expertise in digital fashion design, avatars, scene building, and physical fashion design."></meta>
        <meta itemProp="image" content="https://res.cloudinary.com/dq41jyzzc/image/upload/v1705505443/meta_img.png"></meta>
        <meta property="og:url" content="https://www.studiostuckn.com"></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:title" content="Studio.Stuckn"></meta>
        <meta property="og:description" content="Discover 3D artist Ronja Stucken's portfolio, featuring expertise in digital fashion design, avatars, scene building, and physical fashion design."></meta>
        <meta property="og:image" content="https://res.cloudinary.com/dq41jyzzc/image/upload/v1705505443/meta_img.png"></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:title" content="Studio.Stuckn"></meta>
        <meta name="twitter:description" content="Discover 3D artist Ronja Stucken's portfolio, featuring expertise in digital fashion design, avatars, scene building, and physical fashion design."></meta>
        <meta name="twitter:image" content="https://res.cloudinary.com/dq41jyzzc/image/upload/v1705505443/meta_img.png"></meta>
        <meta name="google-site-verification" content="KSG4ALn4wQN7SBpS0FrUDlyIa7-nYg3vfHvPGznHx2k"></meta>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
};
