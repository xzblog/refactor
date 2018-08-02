/*
 * 常用底部菜单组件
 * @Author: Magical
 */

import React, {Component} from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import './navigator.scss';

export default class Navigator extends Component{
    // 用于检测传入的值得类型
    static propTypes = {
        index: PropTypes.number
    };
    //默认选中第一个
    static defaultProps = {
        index : 0,
    };
    constructor(props){
        super(props);
        this.state = {navList:[
            {
                url:'/', icon:'home', text:'首页'
            },{
                url:'/invest', icon:'invest', text:'理财'
            },{
                url:'/activity', icon:'activity', text:'活动'
            },{
                url:'/account', icon:'account', text:'个人'
            }
        ]};
    }

    render(){
        const menu = [];
        this.state.navList.map((nav,i)=>{
            menu.push(
                <Link to={nav.url}
			  		key={i}
                    className={i === this.props.index ? 'active' : '' }
                >
                    <i className={nav.icon}> </i>
                    <p>{nav.text}</p>
                </Link>);
        });
        return(
            <nav className="yg-navigator">
                {menu}
            </nav>
        );
    }
}




