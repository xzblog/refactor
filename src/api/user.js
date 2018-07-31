/*
 * 用户相关接口请求
 * @Author: Magical
 * @Date: 2018/7/30 0030
 */

import request from 'utils/request'

/**
 * 查询用户是否登录
 * @param params
 * @returns {AxiosPromise}
 */
export function isLogin(params) {
    return request({
        url: '/user/loginState',
        method: 'get',
        params
    })
}




