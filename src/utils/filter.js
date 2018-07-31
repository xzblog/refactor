/*
 * 过滤
 * @Author: Magical
 * @Date: 2018/7/31 0031
 */


/**
 * 项目状态
 * @param state
 * @returns {string}
 */
export function projectState(state){
    let result = '';
    switch(state){
    case '10':
        result = '待发布';
        break;
    case '15':
        result = '即将开始';
        break;
    case '20':
        result = '立即加入';
        break;
    case '30':
        result = '已满标';
        break;
    case '40':
        result = '待还款';
        break;
    case '50':
        result = '部分还款';
        break;
    case '60':
        result = '已还款';
        break;
    case '70':
        result = '流标';
        break;
    case '80':
        result = '已撤标';
        break;
    default:
        result = '状态错误'
    }
    return result
}

/**
 * 还款方式
 * @param type
 * @returns {string}
 */
export function repayType(type){
    let result = '';
    switch(type){
    case '01':
        result = '等额本息';
        break;
    case '02':
        result = '等额本金';
        break;
    case '03':
        result = '先息后本';
        break;
    default:
        result = '到期结清'
    }
    return result
}

/**
 * 周期类型
 * @param type
 * @returns {string}
 */
export function cycleType(type){
    let result = '';
    switch(type){
    case '01':
        result = '天';
        break;
    case '02':
        result = '周';
        break;
    case '03':
        result = '月';
        break;
    case '04':
        result = '季';
        break;
    default:
        result = '年'
    }
    return result
}


