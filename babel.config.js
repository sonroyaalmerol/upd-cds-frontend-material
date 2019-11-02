module.exports = {
  presets: [ ["@vue/app", {
      useBuiltIns: "entry",
      "targets": {
        "browsers": ["last 2 versions", "safari > 8", "not ie < 11"]
      }
    }] 
  ]
}
