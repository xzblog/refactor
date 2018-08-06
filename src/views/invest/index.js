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
        projectList: []
    };

    getProjectList(){
        fetchProjectList().then(res=>{
            console.log(res)
            this.setState({
                projectList: res.list
            })
        })
    };

    componentDidMount(){
        this.getProjectList();
    }

    render(){
        const {projectList} = this.state;
        return(
            <div className="investSec">
                <div className="title">投资</div>
                <div className="tab-nav">
                    <div className="tab-item active">全部</div>
                    <div className="tab-item">新手</div>
                    <div className="tab-item">普通</div>
                </div>

                <div className="content">
                    <PullLoad hasNextPage={true} >
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
