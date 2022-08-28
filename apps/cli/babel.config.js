module.exports = {
  presets: [
    ['@babel/preset-env', { modules: false, targets: { node: 'current' } }],
    ['@babel/preset-typescript'],
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
  env: {
    test: {
      presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
    },
  },
};
