module.exports = {
  extends: [
    "next",
    "turbo",
    "prettier",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
  ],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/react-in-jsx-scope": 0,
    "react/prop-types": 0,
    indent: ["error", 2],
    "no-console": "warn",
    "space-before-function-paren": ["error", "always"],
    "keyword-spacing": [
      "error",
      {
        before: true,
      },
    ],
    "space-infix-ops": "error",
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": "error",
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
};
