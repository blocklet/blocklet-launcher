module.exports = webpack => ({
  optimization: {
    nodeEnv: false, // @link https://github.com/webpack/webpack/issues/7470#issuecomment-394259698
  },
  resolve: {
    alias: {
      axios: require.resolve('axios'),
      debug: require.resolve('debug'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ],
});
