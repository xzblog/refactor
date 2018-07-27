/*
 * 路由文件
 * @Author: Magical
 */

import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './views/home/home';


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
                </Switch>
            </BrowserRouter>
        );
    }
}

