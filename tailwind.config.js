/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // fontFamily: {
      //   cfont: ['var(--font-cfont)'],
      // },
      // backgroundImage: {
      //   "hero-gradient": `
      //     url('/img/Binary_001.png'),
      //     linear-gradient(115.68deg, #000000 25.29%, #2B2B2B 94.75%);`,

      //   "hero-background": 'url("/img/Binary_001.png")',
      // },
    },
  },
  plugins: [],
};
