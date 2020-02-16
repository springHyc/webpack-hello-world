module.exports = {
  //   parser: "sugarss",
  ident: 'postcss',
  plugins: {
    'postcss-import': {},
    'postcss-cssnext': {
      features: {
        customProperties: {
          warnings: false
        }
      }
    },
    cssnano: {}
  }
};
