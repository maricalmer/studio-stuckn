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


//x different font size for mobile nav menus (use content flux)
//x different y margins between pics (use project detail)
//x uniform fashion credits
//x add project credits
//x brand in about page is gone (could be in the top)
// homepage brand more up
//x try to make the bag smaller mobile
//x underline brand about page / mobile
//x flanelle fashion credits / mobile
//x mobile nav menus aligned left (julia) + less Y margin + bigger font
// smaller size glb
//x brand bottom border homepage / mobile
//x less margin top on say hello about page / mobile
