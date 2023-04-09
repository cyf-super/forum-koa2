module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/eslint-parser'
  ],
  parserOpts: {
    sourceType: 'module',
    allowImportExportEverywhere: false
  },
  plugins: ['@babel']
}
