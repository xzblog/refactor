/*
 * 注册
 * @Author: Magical
 * @Date: 2018/8/2 0002
 */

import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {Input, Toast, ImgCode, SmsCode} from "components";

import {register, checkMobile} from 'api/user';
import T from 'utils/index'

class Login extends Component{
    state = {
        mobile: '',
        loginPwd: '',
        reLoginPwd: '',
        imgCode: '',
        smsCode: '',
        inviteCode: '',
    };

    changeValue(key,val){
        this.setState({
            [key]:val
        })
    }

    checkMobile(v) {
        const mobile = T.delSpace(v);
        if(mobile.length === 11){
            checkMobile({mobile}).then(res=>{
                if(!res){
                    Toast.warning('手机号码已注册')
                }
            })
        }
    };

    handleClickRegister = () => {
        const { mobile, imgCode } = this.state;
        const userName = T.delSpace(mobile);

        if(userName.length === 0 ) {
            Toast.show('手机号不能为空')
        }else if(userName.length < 11 ) {
            Toast.show('手机号格式不对');
        }

        const data = {
            userName: userName,
            imgCode: imgCode
        };


        register(data).then(res=> {
            localStorage.setItem('authToken', 'yg-user');
            Toast.success('登录成功', 2000, ()=> {
                this.props.history.push(this.props.location.state)
            })
        })
    };

    componentDidMount(){
        const inviteCode = T.getQuery('inviteCode');
        this.setState({
            inviteCode
        })
    }

    render(){
        const {mobile, imgCode, inviteCode} = this.state;

        return(
            <div className='formSec register'>
                <div className="logo">LOGO</div>
                <div className="form-group">
                    <div className="form-item">
                        <Input
                            type='mobile'
                            placeholder='手机号'
                            onChange={(v)=>{this.changeValue('mobile',v); this.checkMobile(v)}}
                        />
                    </div>
                    <div className="form-item">
                        <Input
                            type="text"
                            placeholder='图形验证码'
                            maxLength={4}
                            rightContent= {<span className='code-btn'><ImgCode ref = 'imgCode'/> </span>}
                            onChange={(v)=>{this.changeValue('imgCode',v)}}
                        />
                    </div>
                    <div className="form-item">
                        <Input
                            type="number"
                            placeholder='短信验证码'
                            maxLength={4}
                            rightContent= {<span className='code-btn'>
                                <SmsCode
                                    parent = {this}
                                    data={{
                                        mobile: T.delSpace(mobile),
                                        bizType: 'register',
                                        vCode: imgCode,
                                        vCodeKey: localStorage.getItem('vCodeKey')
                                    }}
                                >立即发送</SmsCode>
                            </span>}
                            onChange={(v)=>{this.changeValue('smsCode',v)}}
                        />
                    </div>
                    <div className="form-item">
                        <Input
                            type="password"
                            placeholder='请输入密码'
                            maxLength={18}
                            onChange={(v)=>{this.changeValue('loginPwd',v)}}
                        />
                    </div>

                    <div className="form-item">
                        <Input
                            type="password"
                            placeholder='请输入重复密码'
                            maxLength={18}
                            onChange={(v)=>{this.changeValue('reLoginPwd',v)}}
                        />
                    </div>

                    <div className="form-item">
                        <Input
                            type="text"
                            placeholder='请输入邀请码'
                            maxLength={4}
                            defaultValue = {inviteCode}
                            onChange={(v)=>{this.changeValue('inviteCode',v)}}
                        />
                    </div>



                    <div className="btn big" onClick={this.handleClickRegister}>免费注册</div>

                    <div className="other">
                        <Link to='/login'>已有账号， 立即登录 </Link>
                    </div>

                </div>
            </div>
        )
    }
}

export default Login
