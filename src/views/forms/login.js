/*
 * 登录
 * @Author: Magical
 * @Date: 2018/8/2 0002
 */

import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {Input, Toast} from "components";

import { login } from 'api/user';
import T from 'utils/index'

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
        const { mobile, password } = this.state;
        const userName = T.delSpace(mobile);

        if(userName.length === 0 ) {
            Toast.show('手机号不能为空')
        }else if(userName.length < 11 ) {
            Toast.show('手机号格式不对');
        }

        const data = {
            userName: userName,
            loginPwd: password
        };


        login(data).then(res=> {
            localStorage.setItem('authToken', 'yg-user');
            const oldUrl = this.props.location.state;
            const url = oldUrl ? oldUrl : '/account';
            Toast.success('登录成功', 2000, ()=> {
                this.props.history.push(url)
            })
        })
    };


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

                    <div className="other">
                        <Link to='/findPwd'>忘记密码</Link>
                        <Link to='/register'>没有账号？ </Link>
                    </div>

                </div>
            </div>
        )
    }
}

export default Login
