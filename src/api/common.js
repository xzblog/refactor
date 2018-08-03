/*
 * 公用接口请求
 * @Author: Magical
 * @Date: 2018/7/30 0030
 */

import request from 'utils/request'

/**
 * 获取图片验证码
 * @returns {AxiosPromise}
 */
export function fetchImgCode() {
    return request({
        url: '/vCode/findVcodeKey',
        method: 'get'
    })
}

/**
 * 获取短信验证码
 * @returns {AxiosPromise}
 */
export function fetchSmsCode(data) {
    return request({
        url: '/vCode/sendSms',
        method: 'post',
        data
    })
}



