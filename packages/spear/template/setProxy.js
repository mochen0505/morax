const proxySettings = {
    // 接口代理
    '/api/': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
    },
}

module.exports = proxySettings
