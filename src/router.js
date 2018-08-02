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

// 权限验证
const PrivateRoute = ({ component: Component, ...rest }) => {
    const code = localStorage.getItem('code');
    return <Route
        {...rest}
        render={props =>
            code === '0' ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: props.location   //将原本跳转的页面带到登录页去，带登录成功之后在跳转回来
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
                    <Route path="/account" component={Account} />

                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>
            </BrowserRouter>
        );
    }
}

