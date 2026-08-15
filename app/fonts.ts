import localFont from "next/font/local";

export const quella = localFont({
  src: "../public/fonts/Quella.otf",
  variable: "--quella",
});

export const helvetica = localFont({
  src: "../public/fonts/Helvetica.woff2",
  variable: "--helvetica",
});

export const fontVariables = `${quella.variable} ${helvetica.variable}`;
