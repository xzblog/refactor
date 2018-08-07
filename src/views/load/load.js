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
        loadSuccess: false,
        data: []
    };

    pageNum = 1;

    getData() {
        const {pageSize, data} = this.state;
        for (let i = 0; i < pageSize; i++) {
            data.push(`第${this.pageNum}页-第${i+1}条`);
        }

        setTimeout(()=>{
            this.setState({
                data: data,
                loadSuccess: true,
            });

            this.pageNum++;
        },2000)
    }
    componentDidMount(){
        this.getData();
    }
    render(){
        return(
            <div>
                <PullLoad loadSuccess={this.state.loadSuccess} callback={()=>{this.getData()}}>
                    {this.state.data.map((item,i)=>{
                        return <div key={i} >{item}</div>
                    })}
                </PullLoad>
            </div>
        )
    }
}
