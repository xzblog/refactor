/*
 * 用户相关接口请求
 * @Author: Magical
 * @Date: 2018/7/30 0030
 */

import request from 'utils/request'

/**
 * 检测电话号码是否注册过
 * @param data
 * @returns {AxiosPromise}
 */
export function checkMobile(data) {
    return request({
        url: '/user/checkMobile',
        method: 'post',
        data
    })
}

/**
 * 登录
 * @param data
 * @returns {AxiosPromise}
 */
export function login(data) {
    return request({
        url: '/user/accountLogin',
        method: 'post',
        data
    })
}

/**
 * 注册
 * @param data
 * @returns {AxiosPromise}
 */
export function register(data) {
    return request({
        url: '/user/register',
        method: 'post',
        data
    })
}



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

/**
 * 查询登录用户信息
 * @returns {AxiosPromise}
 */
export function fetchUserInfo(){
    return request({
        url: '/member/findLoginUser',
        method: 'post'
    })
}

/**
 * 查询用户认证信息
 * @returns {AxiosPromise}
 */
export function fetchAuthInfo(){
    return request({
        url: '/member/identify',
        method: 'post'
    })
}

/**
 * 查询用户账户信息
 * @returns {AxiosPromise}
 */
export function fetchAccountInfo(){
    return request({
        url: '/member/account',
        method: 'post'
    })
}

/**
 * 查询h5的个人中心， 相当于上面三个请求的总和
 * @returns {AxiosPromise}
 */
export function fetchAppAccountCenter(){
    return request({
        url: '/member/appAccountCenter',
        method: 'get'
    })
}



