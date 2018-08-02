/*
 * 账户首页
 * @Author: Magical
 * @Date: 2018/8/2 0002
 */

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Navigator } from "components";
import { fetchAppAccountCenter } from 'api/user';
import './css/index.scss';

class Account extends Component{
    state = {
        userModel: {},
        userAccountModel: {}
    };

    getAccountCenterInfo(){
        fetchAppAccountCenter().then(res=> {
            console.log(res)
        })
    }

    componentDidMount(){
        this.getAccountCenterInfo();
    };

    render(){
        const {userModel, userAccountModel} = this.state;
        return(
            <div className="accountSec">
                <div className='account-top'>
                    <div className='title'>我的</div>
                    <div className="right-area">
                        <div className="right-area-left">
                            <div className='user-name'>{userModel.mobile}</div>
                            <Link to="/setting/index" className="user-setting">设置资料 <i> </i></Link>
                        </div>
                        <div className="user-avatar">
                            {
                                <img src={userModel.avatar || require('./images/avatar.jpg')} alt=""/>
                            }
                        </div>
                    </div>
                </div>
                <div className="total-amount">
                    <p>总资产(元)</p>
                    <div className="value">{userAccountModel.netAssets || 0}</div>
                </div>
                <div className="user-amount">
                    <div className="item usable-amount">
                        <p>可用余额(元)</p>
                        <div className="value">{userAccountModel.usable || 0}</div>
                    </div>
                    <div className="item usable-amount">
                        <p>累计收益(元)</p>
                        <div className="value">{userAccountModel.interestSum || 0}</div>
                    </div>
                </div>
                <div className="btn-area">
                    <Link className="item" to="/account/cash" >
                        <div className="account-btn cash-btn">提现</div>
                    </Link>
                    <Link className="item" to="/account/recharge">
                        <div className="account-btn recharge-btn">充值</div>
                    </Link>
                </div>



                <div className="opacity-list">
                    <Link className="opacity-item" to='/account/welfare'>
                        <span className="icon icon-welfare"/>
                        <div className="title">
                            我的券包
                        </div>
                    </Link>

                    <Link className="opacity-item" to="/account/card/list">
                        <span className="icon icon-card"/>
                        <div className="title">
                            我的银行卡
                        </div>
                    </Link>

                    <Link className="opacity-item" to='/account/calendar'>
                        <span className="icon icon-calendar"/>
                        <div className="title">
                            回款日历
                        </div>
                    </Link>

                    <Link className="opacity-item" to='/account/capital'>
                        <span className="icon icon-captialRecord"/>
                        <div className="title">
                            资金记录
                        </div>
                    </Link>
                    <Link className="opacity-item" to='/account/invest/list'>
                        <span className="icon icon-investRecord"/>
                        <div className="title">
                            投资记录
                        </div>
                    </Link>

                    <Link className="opacity-item" to='/account/msg'>
                        <span className="icon icon-msg">

                        </span>
                        <div className="title">
                            消息中心
                        </div>
                    </Link>
                </div>
                <Navigator index={3} />
            </div>
        )
    }
}


export default Account
