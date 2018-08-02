/*
 * 注册
 * @Author: Magical
 * @Date: 2018/8/2 0002
 */

import React, {Component} from 'react';

class Login extends Component{
    render(){
        return(
            <div>
                <div className="form-group">
                    <div className="form-item">
                        <label> </label>
                        <div className="input">
                            <input type="text" placeholder="请输入用户名"/>
                        </div>
                    </div>
                    <div className="form-item">
                        <label> </label>
                        <div className="input">
                            <input type="password" placeholder="请输入密码"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
