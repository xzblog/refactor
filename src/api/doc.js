/*
 * 项目相关接口请求
 * @Author: Magical
 * @Date: 2018/7/30 0030
 */

import request from 'utils/request'

/**
 * 获取首页轮播图
 * @returns {AxiosPromise}
 */
export function fetchBanner() {
    return request({
        url: '/doc/docBanner/findTitlePageList',
        method: 'get'
    })
}


