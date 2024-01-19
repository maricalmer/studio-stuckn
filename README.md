### [studiostuckn.com](https://www.studiostuckn.com/), a portfolio website to showcase fashion projects

## Static website

Website developed with HTML, CSS, Javascript, React, Next.js, Three.js and Tailwind. Assets are bundled with Webpack. Application is run on Netlify.

![HTML](https://img.shields.io/badge/HTML-5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-3-264DE4?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=for-the-badge&logo=javascript&logoColor=white)
![React](https://img.shields.io/badge/react-18-149eca?style=for-the-badge&logo=react&logoColor=white)
![Next.js](https://img.shields.io/badge/next.js-13-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Tailwind](https://img.shields.io/badge/tailwind-3-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)

## JS Packages (non exhaustive)

[![threejs](https://img.shields.io/badge/three-0.155.0-yellow.svg)](https://classic.yarnpkg.com/en/package/three)

[![animejs](https://img.shields.io/badge/animejs-3.2.1-yellow.svg)](https://yarnpkg.com/package/animejs)
[![@mui/x-date-pickers](https://img.shields.io/badge/@mui-6.2.0-yellow.svg)](https://yarnpkg.com/package/@mui/x-date-pickers)

## APIs

[![archive](https://img.shields.io/badge/Open--Meteo-archive-green.svg)](https://open-meteo.com/en/docs/historical-weather-api)
[![geocoding](https://img.shields.io/badge/Open--Meteo-geocoding-green.svg)](https://open-meteo.com/en/docs/geocoding-api)

## Run Locally

Clone the project

```bash
  git clone git@github.com:maricalmer/maricalmer.github.io.git my-project
```

Go to the project directory and remove git logs

```bash
  cd my-project
  rm -rf .git
```

Install dependencies

```bash
  bundle install
  yarn install
```

Make sure you have ./node_modules/.bin in your $PATH:

```bash
  echo $PATH
  # You should see `./node_modules/.bin` in the list
```

If it's not the case, add it:

```bash
  cd ~/code/dotfiles/<your_github_nickname>
  echo 'export PATH="./bin:./node_modules/.bin:${PATH}"' >> zshrc
  cd ~/code/<your_github_nickname>/my-project
  source ~/.zshrc
```

Start the server

```bash
  yarn start
```

## Visit the page!

[birth-weather](https://incredible-cascaron-139c6d.netlify.app/)

## License

[MIT](https://choosealicense.com/licenses/mit/)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
