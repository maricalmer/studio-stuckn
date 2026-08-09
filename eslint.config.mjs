import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const currentDirectory = dirname(fileURLToPath(import.meta.url));

// eslint-config-next 15 still publishes the legacy shareable-config format.
// FlatCompat lets ESLint 9 consume the same core-web-vitals rules through its
// explicit flat configuration system.
const compatibility = new FlatCompat({
  baseDirectory: currentDirectory,
});

const eslintConfig = [
  ...compatibility.extends("next/core-web-vitals"),
  {
    // These generated and dependency directories were ignored implicitly by
    // `next lint`; list them explicitly now that ESLint owns file discovery.
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**"],
  },
];

export default eslintConfig;
