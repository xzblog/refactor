/*
 * 上拉加载
 * @Author: Magical
 */

import React, {Component} from 'react'


import './pull-load.scss'


export default class PullLoad extends Component{
    state ={
        moveH: 0,
        showTips: false,
        hasNextPage: true,
    };

    handleTouchStart = (e) => {
        this.setState({
            startY: e.changedTouches[0].screenY
        })
    };

    handleTouchMove = (e) => {
        const moveHeight = this.state.startY - e.changedTouches[0].screenY;

        const rootBox= this.refs.rootBox;
        const listBox= this.refs.listBox;

        const rootBoxHeight = rootBox.offsetHeight;
        const listBoxHeight = listBox.offsetHeight;
        const scrollTop = rootBox.scrollTop;

        if((rootBoxHeight + scrollTop) >= listBoxHeight && this.state.hasNextPage){
            if(40< moveHeight && moveHeight < 60){
                this.setState({
                    tips: '上拉加载更多',
                    showTips: true
                })
            }else if (moveHeight > 60){
                this.setState({
                    tips: '松开即可刷新',
                    showTips: true
                })
            }

            this.setState({
                moveH: moveHeight
            });
        }
    };

    handleTouchEnd = (e) => {
        const moveHeight = this.state.startY - e.changedTouches[0].screenY;

        const rootBox= this.refs.rootBox;
        const listBox= this.refs.listBox;
        const rootBoxHeight = rootBox.offsetHeight;
        const listBoxHeight = listBox.offsetHeight;
        const scrollTop = rootBox.scrollTop;
        if((rootBoxHeight + scrollTop) >= listBoxHeight && this.state.hasNextPage) {
            if (moveHeight > 60) {
                this.setState({
                    moveH: 40,
                    tips: '加载中...'
                });

                this.props.callback();


            } else {
                this.setState({
                    moveH: 0,
                    showTips: false,
                });
            }
        }
    };

    componentWillReceiveProps(props){
        if(props.loadSuccess){
            if(!props.hasNextPage){
                this.setState({
                    tips: '没有更多了',
                    showTips: true,
                    moveH: 0,
                    hasNextPage: false
                });
            }else{
                this.setState({
                    tips: '加载成功',
                    moveH: 0,
                    showTips: false,
                });
            }

        }

    }


    render(){
        const {children} = this.props;
        const {showTips, moveH} = this.state;
        const style = {
            transform: moveH > 0 ? `translate3d(0, ${-moveH}px, 0)`: null,

        };
        return(
            <div ref="rootBox" className='yg-pull-load'>
                <div ref="listBox" className='yg-pull-load-content'
                    onTouchStart={this.handleTouchStart}
                    onTouchMove={this.handleTouchMove}
                    onTouchEnd={this.handleTouchEnd}
                    style={style}
                >
                    {children}
                    <p className={`tips ${showTips ?'show':''}`}>{this.state.tips}</p>
                </div>

            </div>
        )
    }
}
