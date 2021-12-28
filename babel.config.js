module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '38',
        },
        useBuiltIns: 'entry',
        corejs: '3.0',
      },
    ],
    '@babel/preset-react',
  ],
};
