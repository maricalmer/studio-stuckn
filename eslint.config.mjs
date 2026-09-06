import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextVitals,
  {
    files: ["components/AboutImage.tsx", "components/HomeExperience.jsx"],
    rules: {
      // These existing effects initialize state from browser-only layout and
      // matchMedia measurements after hydration. Preserve their baseline
      // behavior during the framework checkpoint; keep the new rule elsewhere.
      "react-hooks/set-state-in-effect": "off",
    },
  },
  {
    // These generated and dependency directories were ignored implicitly by
    // `next lint`; list them explicitly now that ESLint owns file discovery.
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "studio/**"],
  },
];

export default eslintConfig;
