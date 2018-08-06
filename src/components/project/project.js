/*
 * 单个项目
 * @Author: Magical
 * @Date: 2018/8/6 0006
 */

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Progress} from "components";
import {cycleType} from "utils/filter";
import './project.scss';

export default class Project extends Component{
    constructor(props){
        super(props);
        this.state = props.data
    }

    innerTimer;

    /**
     * 倒计时
     */
    countdown = ()=>{
        this.innerTimer = setInterval(()=>{
            let time = this.state.data.countDownInvest*1;
            if(time <= 1){
                clearInterval(this.innerTimer);
                this.setState({
                    prjState: '20'
                })
            }else{
                this.setState({
                    countDownInvest: --time
                });
            }

        },1000);
    };


    componentDidMount(){
        if(this.state.prjState === '15'){
            this.countdown();
        }

    }

    componentWillUnmount(){
        clearInterval(this.innerTimer);
    }

    render(){
        let data = this.state;
        console.log(this.props);
        return (
            <Link className="prj-item" to={`/invest/detail/${data.prjNo}`}>
                <div className="prj-name">
                    {
                        data.prjState === '15' ?
                            <div className="count-time">
                                开标倒计时:
                                {Math.floor(data.countDownInvest/60)}:
                                {data.countDownInvest%60}
                            </div>
                            :
                            ''
                    }
                    <div className="text">{data.prjName}</div>
                </div>

                <div className="prj-cont">
                    <div className="item rate">
                        <div className="value">{data.yearRate}<span >%
                            {
                                data.addRate*1 > 0 ? `${data.addRate}%` : ''
                            }
                        </span>

                        </div>
                        <div className="item-title">{data.prjAttr === '02'? <span className="new">&lt;新手专享&gt;</span> :''}年化收益</div>
                    </div>

                    <div className="item date">
                        <div className="value">
                            {data.cycle}<span>{cycleType(data.cycleType)}</span>
                        </div>
                        <div className="item-title">项目期限</div>
                    </div>


                    <div className="item invest-btn">
                        <div className="progress-wrap">
                            <Progress percent={data.scales} />
                            <span>{data.scales}%</span>
                        </div>

                        <div className={ data.prjState*1 >= 30? "btn small disabled":"btn small"}>
                            {
                                data.prjState === '15' ? '即将开售':
                                    data.prjState === '20' ? '立即投资':
                                        '已售完'
                            }
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}
