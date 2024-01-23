module.exports = {
  presets: [
    [
      'babel-preset-react-app',
      {
        typescript: true,
        runtime: 'automatic',
      },
    ],
  ],
  plugins: [
    [
      require('@umijs/babel-preset-umi/dist/plugins/autoCSSModules')
    ]
  ],
  sourceType: 'unambiguous',
};
