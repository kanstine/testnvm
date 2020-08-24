module.exports = {
  publicPath: './',
  productionSourceMap: false,
  // productionSourceMap: process.env.NODE_ENV === 'production',
  devServer: {
    port: 8088,
    proxy: {
      '': {
        // 测试 http://172.16.60.20:5007/  // 本地-瞿 10.10.20.109:8087 // 温 192.168.12.64:8087 // 顺 http://192.168.12.68:8080 // vpn 10.8.0.9:8085
        target: 'http://172.16.60.20:8017/',
        changeOrigin: true,
        pathRewrite: {}
      }
    }
  },
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: ['./src/assets/css/_variable.scss', 'node_modules/joy-reach-admin-ui/src/css/_variable.scss']
        })
        .end()
    })
  }
}
