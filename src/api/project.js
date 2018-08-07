/*
 * 项目相关接口请求
 * @Author: Magical
 * @Date: 2018/7/30 0030
 */

import request from 'utils/request'

/**
 * 获取首页新手标
 * @returns {AxiosPromise}
 */
export function fetchIndexNovice() {
    return request({
        url: '/project/findNovice',
        method: 'get'
    })
}

export function fetchProjectList(data) {
    return request({
        url: '/project/findAppPageList',
        method: 'post',
        data
    })
}
