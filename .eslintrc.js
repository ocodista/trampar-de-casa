export default {
  extends: [
    "next",
    "turbo",
    "prettier",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
    "prettier"
  ],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "@next/next/no-img-element": "off",
    "react/react-in-jsx-scope": 0,
    "no-console": "warn",
    "react-hooks/exhaustive-deps": "off"
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
};
