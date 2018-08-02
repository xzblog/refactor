/*
 * 登录
 * @Author: Magical
 * @Date: 2018/8/2 0002
 */

import React, {Component} from 'react';

import { Input } from "components";

import { login } from 'api/user';

import './from.scss';

class Login extends Component{
    state = {
        mobile: '',
        password: ''
    };

    changeValue(key,val){
        this.setState({
            [key]:val
        })
    }

    handleClickLogin = () => {
        console.log(this.state);
    };

    componentDidMount(){

    }

    render(){
        return(
            <div className='formSec login'>
                <div className="logo">LOGO</div>
                <div className="form-group">
                    <div className="form-item">
                        <Input type='mobile'
                            placeholder='手机号'
                            onChange={(v)=>{this.changeValue('mobile',v)}}
                        />
                    </div>
                    <div className="form-item">
                        <Input
                            type="password"
                            placeholder='请输入密码'
                            maxLength={18}
                            onChange={(v)=>{this.changeValue('password',v)}}
                        />
                    </div>

                    <div className="btn big" onClick={this.handleClickLogin}>登录</div>
                </div>
            </div>
        )
    }
}

export default Login
