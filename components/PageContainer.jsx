import localFont from 'next/font/local';

const quella = localFont({src: '../public/fonts/Quella.woff', variable: '--quella'});
const helvetica = localFont({src: '../public/fonts/Helvetica.woff', variable: '--helvetica'});

export default function PageContainer({ children, backgroundColor }) {
  return (
    <div lang="en" className={`${quella.variable} ${helvetica.variable} absolute top-0 ${backgroundColor} h-fit w-screen`}>
      {children}
    </div>
  );
};
