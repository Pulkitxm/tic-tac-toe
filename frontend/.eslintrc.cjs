module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "es2020": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended"
  ],
  "ignorePatterns": ["dist", ".eslintrc.cjs"],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "settings": {
    "react": {
      "version": "18.2"
    }
  },
  "plugins": ["react-refresh"],
  "rules": {
    "strict": ["error", "safe"],
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": [
      "warn",
      { "allowConstantExport": true }
    ],
    // Additional rules for good practices:
    "semi": ["error", "always"], // Enforce semicolons at the end of statements
    "quotes": ["error", "double"], // Enforce single quotes for string literals
    "no-unused-vars": "error", // Disallow unused variables
    "react/react-in-jsx-scope": "off", // React is in scope, so no need to import React in every file
    "react/jsx-uses-react": "off", // React is in scope, so no need to flag JSX
    "react/jsx-uses-vars": "error" // Enforce proper usage of variables in JSX
  }
}
