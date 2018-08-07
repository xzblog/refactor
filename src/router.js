/*
 * 路由文件
 * @Author: Magical
 */

// 首页
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from './views/home/index';

// 投资相关
import Invest from './views/invest/index';

// 活动相关
import Activity from './views/activity/index';

// 个人中心
import Account from './views/account/index';

import Login from './views/forms/login';

import Register from './views/forms/register'

import Load from './views/load/load'

// 权限验证
const PrivateRoute = ({ component: Component, ...rest }) => {
    const authToken = localStorage.getItem('authToken');    // 查询用户登录信息， 在登录成功后设置，  登录状态失效后清除
    return <Route
        {...rest}
        render={props =>
            authToken ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: props.location   //将原本跳转的页面带到登录页去，待登录成功之后再跳转回来
                    }}
                />
            )
        }
    />;
};


export default class App extends Component {
    render() {
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/invest" component={Invest} />
                    <Route path="/activity" component={Activity} />
                    <Route path="/pullLoad" component={Load} />

                    <PrivateRoute path="/account" component={Account} />

                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>
            </BrowserRouter>
        );
    }
}

