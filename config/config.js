// 常用配置

module.exports ={
    server: {
        host: '192.168.1.154',
        port: '3000',
        proxy: {
            "/api": "http://localhost:9000",
        }
    }
};
