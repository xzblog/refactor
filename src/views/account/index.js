/*
 * 账户首页
 * @Author: Magical
 * @Date: 2018/8/2 0002
 */

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Navigator, Toast } from "components";
import { fetchAppAccountCenter } from 'api/user';
import './css/index.scss';

class Account extends Component{
    state = {
        userModel: {},
        accountModel: {},
        authModel: {}
    };

    getAccountCenterInfo(){
        fetchAppAccountCenter().then(res=> {
            this.setState({
                userModel: res.userModel,
                accountModel: res.userAccountModel,
                authModel: res.userIdentify
            })
        })
    }

    handleClickTo = (url) =>{
        const {authModel} = this.state;
        if(authModel.realNameState !== '10'){
            Toast.warning('请先实名');
            return
        }
        if(authModel.payPwdState !== '10'){
            Toast.warning('请先设置支付密码');
            return
        }
        if(authModel.bindCardState !== '10'){
            Toast.warning('请先绑卡');
            return
        }
        this.props.history.push(url);
    };


    componentDidMount(){
        this.getAccountCenterInfo();
    };

    render(){
        const {userModel, accountModel} = this.state;
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
                    <div className="value">{accountModel.netAssets || 0}</div>
                </div>
                <div className="user-amount">
                    <div className="item usable-amount">
                        <p>可用余额(元)</p>
                        <div className="value">{accountModel.usable || 0}</div>
                    </div>
                    <div className="item usable-amount">
                        <p>累计收益(元)</p>
                        <div className="value">{accountModel.interestSum || 0}</div>
                    </div>
                </div>
                <div className="btn-area">
                    <div className="item" onClick={() =>{this.handleClickTo('/account/cash')}} >
                        <div className="account-btn cash-btn">提现</div>
                    </div>
                    <div className="item" onClick={() =>{this.handleClickTo('/account/recharge')}}>
                        <div className="account-btn recharge-btn">充值</div>
                    </div>
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
