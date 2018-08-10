/*
 * 上拉加载
 * @Author: Magical
 * @Date: 2018/8/6 0006
 */


import React, {Component} from 'react';
import {PullLoad} from "components";


export default class Load extends Component{
    state = {
        pageNum: 1,
        pageSize: 20,
        loadSuccess: false,
        hasNextPage: true,
        data: []
    };


    getData() {
        const {pageNum, pageSize, hasNextPage, data} = this.state;


        if(!hasNextPage) return;
        setTimeout(()=>{
            for (let i = 0; i < pageSize; i++) {
                data.push(`第${pageNum}页-第${i+1}条`);
            }
            this.setState({
                data: data,
                loadSuccess: true,
                pageNum: pageNum+1
            });
            if(pageNum+1 > 2) {
                this.setState({
                    hasNextPage: false,
                });
            }
        },2000)
    }
    componentDidMount(){
        this.getData();
    }
    render(){
        console.log(this.state.data)
        return(
            <div>
                <PullLoad loadSuccess={this.state.loadSuccess} hasNextPage={this.state.hasNextPage} callback={()=>{this.getData()}}>
                    {this.state.data.map((item,i)=>{
                        return <div key={i} >{item}</div>
                    })}
                </PullLoad>
            </div>
        )
    }
}
