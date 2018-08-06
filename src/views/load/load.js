/*
 * 上拉加载
 * @Author: Magical
 * @Date: 2018/8/6 0006
 */


import React, {Component} from 'react';
import {PullLoad} from "components";


export default class Load extends Component{
    state = {
        pageSize: 20,
        pageNum: 1
    };

    genData() {
        const dataArr = [];
        for (let i = 0; i < pageSize; i++) {
            dataArr.push(`第${i}行`);
        }
        return dataArr;
    }
    componentDidMount(){
        this.getData()
    }
    render(){
        return(
            <div>
                <PullLoad>

                </PullLoad>
            </div>
        )
    }
}
