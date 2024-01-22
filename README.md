### [studiostuckn.com](https://www.studiostuckn.com/), a portfolio website to showcase fashion projects

## Static website

Website developed with Javascript, React, Next.js, CSS and Tailwind. Assets are bundled with Webpack. Application is run on Netlify.

![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=for-the-badge&logo=javascript&logoColor=white)
![React](https://img.shields.io/badge/react-18-149eca?style=for-the-badge&logo=react&logoColor=white)
![Next.js](https://img.shields.io/badge/next.js-13-000000?style=for-the-badge&logo=next.js&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-3-264DE4?style=for-the-badge&logo=css3&logoColor=white)
![Tailwind](https://img.shields.io/badge/tailwind-3-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)

## JS Packages (non exhaustive)

[![threejs](https://img.shields.io/badge/three-0.155.0-yellow.svg)](https://classic.yarnpkg.com/en/package/three)
[![framer-motion](https://img.shields.io/badge/framer--motion-10.18.0-yellow.svg)](https://classic.yarnpkg.com/en/package/framer-motion)

## Run Locally

Clone the project

```bash
  git clone git@github.com:maricalmer/studio-stuckn my-project
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
  npm run dev
  # or
  yarn dev
  # or
  pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Visit the page!

[studiostuckn.com](https://www.studiostuckn.com/)

## License

[MIT](https://choosealicense.com/licenses/mit/)
