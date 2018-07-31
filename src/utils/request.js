/*
 * 封装axios
 * @Author: Magical
 * @Date: 2018/7/30 0030
 */

import axios from 'axios';
import {JSEncrypt} from 'jsencrypt';
import {server} from '../../config/config';


/*需要加密的字段*/
const encryptMapper = [
    "loginPwd","reLoginPwd","oldLoginPwd","mobile","userName","realName","idNumber","payPwd","rePayPwd","oldPayPwd","cardNo"
];

const jsencrypt= function(param){
    const public_key = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCwwGlyRh968odnK9TL7DmpMQa0dBBHbjBKL0/Fgo0SQIaIXInyj6eyLU9HRwpU0K2/7KJR185kIFJ63BeDNW4smE+L7GrfBkYzAXdQOlff6IjZM2MpClgm1wFumuaogZvgZTH1ac6baSfuaBUCkLwss8Gt6McflNAEYQvsgiPg5wIDAQAB';
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(public_key);
    return encrypt.encrypt(param)
};




// 创建axios实例
const service = axios.create({
    baseURL: `${server.ip}/api/${server.version}`, // api的baseUrl
    timeout: 5000, // 请求超时时间
    headers: {'clientType': server.clientType, 'version': server.version},  // 全局请求头
    withCredentials: true, // 表示跨域请求时是否需要使用凭证
});

// 请求拦截器
service.interceptors.request.use(config => {
    // 处理参数中需要加密的字段
    for(let i in config.data){
        if(encryptMapper.indexOf(i) !== -1 && config.data.hasOwnProperty(i)){
            config.data[i] = jsencrypt(config.data[i]).replace(/\s/g,'');
        }
    }
    return config
}, error => {
    console.log(error); // for debug
    Promise.reject(error)
});

// 响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;
        // code为非200是抛错
        if (res.code !== '200') {
            console.log(res.msg);
            // 登录状态失效
            if(res.code === '403'){
                alert('登录状态失效');
            }
            return Promise.reject('error')
        } else {
            return response.data.result
        }
    },
    error => {
        console.log('err' + error); // for debug
        // 网络级别的错误
        return Promise.reject(error)
    }
);

export default service
