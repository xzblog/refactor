/*
 * 活动
 * @Author: Magical
 * @Date: 2018/8/2 0002
 */

import React, {Component} from 'react';
import { Navigator, PullLoad } from "components";
import Project from 'components/project/project';

import {fetchProjectList} from 'api/project';
import './invest.scss';

class Invest extends Component{

    state = {
        pageNum: 1,
        hasNextPage: 0,
        projectList: [],
        loadSuccess: false,
        tabList: [{id:'01', text:'全部'}, {id:'02', text:'新手'}, {id:'03', text:'普通'}],
        tabIndex: '01'
    };





    getProjectList(type='01', page){
        const {projectList, pageNum} = this.state;
        const data = {
            prjSearch: type,
            pageNum: page ? page : pageNum,
            pageSize: '10'
        };

        fetchProjectList(data).then(res=>{
            this.setState({
                projectList: res.pageNum===1 ? res.list : projectList.concat(res.list),
                loadSuccess: true,
                hasNextPage: res.hasNextPage,
                pageNum: res.pageNum+1
            });
        })
    };

    handleClickTab = (type,)=>{
        this.setState({
            tabIndex: type
        });
        this.getProjectList(type, 1)
    };

    componentDidMount(){
        this.getProjectList();
    }

    render(){
        const {projectList, hasNextPage, tabList, tabIndex} = this.state;
        return(
            <div className="investSec">
                <div className="invest-top">
                    <div className="title">投资</div>
                    <div className="tab-nav">
                        {
                            tabList.map((item, i)=>{
                                return <div
                                    key={item.id}
                                    className={`tab-item ${tabIndex===item.id ? 'active': null}`}
                                    onClick={()=>{this.handleClickTab(item.id)}}
                                >{item.text}</div>
                            })
                        }
                    </div>
                </div>

                <div className="content">
                    <PullLoad
                        hasNextPage={hasNextPage}
                        loadSuccess={this.state.loadSuccess}
                        callback={()=>{this.getProjectList()}}
                        style ={{top:'2rem', bottom: '1rem'}}
                    >
                        {
                            projectList.map((item, i)=>{
                                return <Project data={item} key={item.prjNo} />
                            })
                        }
                    </PullLoad>
                </div>

                <Navigator index={1} />
            </div>
        )
    }
}


export default Invest
