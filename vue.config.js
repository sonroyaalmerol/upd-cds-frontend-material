module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'public/service-worker.js',
      exclude: [
        /\.map$/, 
        /manifest\.json$/ 
      ],
    },
    themeColor: '#cf6679'
  },
}