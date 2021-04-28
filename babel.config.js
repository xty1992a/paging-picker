const isDev = process.env.NODE_ENV === "development";

const plugins = [
  ["@babel/plugin-transform-react-jsx"],
  "@babel/plugin-transform-runtime",
];

if (isDev) {
  plugins.push([
    "import",
    {
      libraryName: "antd",
      libraryDirectory: "es",
      style: "css",
    },
  ]);
}

module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins,
};
