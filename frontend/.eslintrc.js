module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    'indent': "off",
    "vue/script-indent": [
      "error",
      4,
      {
        baseIndent: 1
      }
    ],
    'no-unused-vars': 'off',
    'eqeqeq': 0,
    "no-unused-expressions": 1,
    "one-var": 'off',
    "no-sequences": 1,
    "no-mixed-operators": 1,
    "no-redeclare": 1,
    "no-undef": 1,
    'semi': [2, "always"],
    "no-multi-spaces": 0,
    "no-mixed-spaces-and-tabs": 0,
    "no-tabs": "off",
    "prettier/prettier": "off"
  }
};
