// 常用配置

module.exports ={
    // 客户端配置
    client: {
        host: '192.168.1.154',
        port: '4000',
        proxy: {
            // "/api": "http://localhost:9000",
        }
    },

    // 服务端配置
    server: {
        ip: 'http://172.16.0.42:8080', // 请求地址
        version: 'v100', // 版本号
        clientType: '02' // 客户端标识符 02 表示h5
    }
};
