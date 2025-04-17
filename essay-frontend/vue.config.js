module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // 后端地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // 去除请求路径中的/api
        }
      }
    }
  }
}

