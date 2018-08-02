/*
 * 首页
 * @Author: Magical
 */

import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {Page, Navigator, Carousel} from "components";
import {fetchIndexNovice} from "api/project";
import {fetchBanner, fetchNotice} from "api/doc";
import {cycleType, projectState} from 'utils/filter';

import './home.scss';


export default class Home extends Component{
    state = {
        novice: {},
        bannerList: [],
        notices: []
    };

    getBanner = () =>{
        fetchBanner().then(res=>{
            this.setState({
                bannerList: res
            })
        })
    };

    getNotice = () =>{
        fetchNotice({nid: 'platform_notice'}).then(res=>{
            this.setState({
                notices: res
            })
        })
    };
    getNovice = ()=>{
        fetchIndexNovice().then(res=>{
            this.setState({
                novice: res
            })
        })
    };


    componentDidMount(){
        this.getNovice();
        this.getBanner();
        this.getNotice();
    }
    render(){
        const { novice, bannerList, notices } = this.state;
        return(
            <Page title="首页">
                <div className="homeSec">
                    <Carousel className="carousel" autoplay>
                        {
                            bannerList.map((item, i)=> {
                                return <a key={i} href={item.href}><img  src={item.imgPath} alt={item.title} /></a>
                            })
                        }
                    </Carousel>

                    <div className="notice">
                        {   notices.length ?
                            <Carousel className="cont" autoplay vertical speed={0.3} delay={3}>
                                {
                                    notices.map((item)=>{
                                        return <div key={item.id} className="item">{item.title}</div>
                                    })
                                }
                            </Carousel>
                            :
                            <div className="item" key='zwgg'>暂无公告</div>
                        }
                    </div>


                    <div className="platform-intro">
                        <div className="intro-item"><img src={require("./images/fmd_wap_home_pic_safe@2x.png")} alt="安全"/> </div>
                        <div className="intro-item"><img src={require("./images/fmd_wap_home_pic_compliance@2x.png")} alt="合规"/> </div>
                        <div className="intro-item"><img src={require("./images/fmd_wap_home_pic_earnings@2x.png")} alt="收益"/> </div>
                    </div>

                    <Novice data={novice} />

                    <div className="tips">投资有风险，理财需谨慎</div>

                    <Navigator index={0}/>
                </div>
            </Page>
        )
    }
}



class Novice extends Component{
    render(){
        const { data } = this.props;
        return(
            <div className="novice">
                <div className="title">新手专区</div>
                <div className="cont">
                    <div className="name">{data.prjName}<span>888元大礼包</span></div>
                    <div className="prj-info">{data.minInvest}元起投  {data.cycleDays}{cycleType(data.cycleType)}回款</div>
                    <div className="value">{data.yearRate}<span>% {data.addRate*1 !==0 ? `+${data.Rate}`: null}</span> </div>
                    <p><span className="red">&lt; 新手专享&gt;</span> 预期年化利率</p>

                    {data.prjState === '15' ?    // 即将开始
                        <Link to={`/invest/details/${data.prjNo}`} className="btn small">{projectState(data.prjState)}</Link>
                        :
                        data.prjState === '20' ?   // 正在进行
                            <Link to={`/invest/details/${data.prjNo}`} className="btn small">{projectState(data.prjState)}</Link>
                            :
                            <Link to={`/invest/details/${data.prjNo}`} className="btn small disabled">{projectState(data.prjState)}</Link>
                    }
                </div>
            </div>
        )
    }
}
