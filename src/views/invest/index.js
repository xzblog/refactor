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
        projectList: [],
        loadSuccess: false,
        hasNextPage: 0
    };

    pageNum = 1;

    getProjectList(){
        const {projectList} = this.state;
        const data = {
            prjSearch: '01',
            pageNum: this.pageNum,
            pageSize: '10'
        };
        fetchProjectList(data).then(res=>{
            console.log(res);
            this.setState({
                projectList: projectList.concat(res.list),
                loadSuccess: true,
                hasNextPage: res.hasNextPage
            });
            this.pageNum++;
        })
    };

    componentDidMount(){
        this.getProjectList();
    }

    render(){
        const {projectList, hasNextPage} = this.state;
        return(
            <div className="investSec">
                <div className="invest-top">
                    <div className="title">投资</div>
                    <div className="tab-nav">
                        <div className="tab-item active">全部</div>
                        <div className="tab-item">新手</div>
                        <div className="tab-item">普通</div>
                    </div>
                </div>

                <div className="content">
                    <PullLoad hasNextPage={hasNextPage} loadSuccess={this.state.loadSuccess} callback={()=>{this.getProjectList()}}>
                        {projectList.map((item, i)=>{
                            return <Project data={item} key={i} />
                        })}
                    </PullLoad>
                </div>

                <Navigator index={1} />
            </div>
        )
    }
}


export default Invest
