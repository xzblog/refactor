/*
 * 短信验证码
 * @Author: Magical
 * @Date: 2018/8/3 0003
 */

import React, {Component} from 'react';
import ClassNames from 'classnames';
import {fetchSmsCode} from 'api/common';

export default class SmsCode extends Component{
    constructor(props){
        super(props);
        console.log(props.parent);
    }
    state = {
        disable: false,
        children: this.props.children
    };

    handleClick = () =>{

        const {data, parent} = this.props;
        this.setState({
            children: '发送中...',
            disable: true
        });
        fetchSmsCode(data).then(res=>{
            let delayTime =  120;
            this.timer = setInterval( ()=>{
                if(delayTime < 1){
                    this.setState({
                        children: '重新发送',
                        disable: false,
                    });
                    // 此处还需触发图片验证码点击事件， 重新获取图片验证码
                    clearInterval(this.timer)
                }else{
                    this.setState({
                        children: `已发送${delayTime--}`,
                    });
                }
            },1000)

        }).catch(err=>{
            this.setState({
                children: '重新发送',
                disable: false
            });
            // 此处还需触发图片验证码点击事件， 重新获取图片验证码
            // parent.refs.imgCode.handleClick();
        })
    };


    componentWillUnmount(){
        clearInterval(this.timer)
    }

    render(){
        const { children, disable} = this.state;
        const cls = ClassNames({
            'yg-send-btn' : true,
            'disabled': disable
        });
        return(
            <a
                className={cls}
                onClick={this.handleClick}
            >
                {children}
            </a>
        )
    }
}
