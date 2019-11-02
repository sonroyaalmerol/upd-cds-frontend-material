// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  productionSourceMap: false,
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all',
        name: false,
        cacheGroups: {
          styles: {
            name: false,
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          }
        },
      }
    },
    // plugins: [new BundleAnalyzerPlugin()]
  },
  chainWebpack: config => {
    config.plugin('friendly-errors').tap(args => {
      // the actual transformer defined by vue-cli-3
      const vueCli3Transformer = args[0].additionalTransformers[0];
      args[0].additionalTransformers = [
        // use the actual transformer
        vueCli3Transformer,
        // add an other transformer that 'empty' the desired error
        error => {
          const regexp = /\[mini-css-extract-plugin\]\nConflicting order between:/;
          if (regexp.test(error.message)) return {};
          return error;
        },
      ];
      return args;
    });
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