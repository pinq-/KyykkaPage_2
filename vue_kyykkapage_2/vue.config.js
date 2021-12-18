module.exports = {
    publicPath: "/kyykka",
    css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/colors.scss";`
      }
    }
  }
}
