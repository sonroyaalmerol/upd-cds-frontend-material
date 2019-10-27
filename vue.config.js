// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 200000,
      }
    },
    // plugins: [new BundleAnalyzerPlugin()]
  },
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
      exclude: [
          /\.map$/, 
          /manifest\.json$/ 
      ]
    }
  },
}