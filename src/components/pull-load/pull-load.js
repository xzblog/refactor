/*
 * 上拉加载
 * @Author: Magical
 */

import React, {Component} from 'react'


import './pull-load.scss'


export default class PullLoad extends Component{
    state ={
        moveY: 0,
        showTips: false,
    };
    handleTouchStar = (e) => {
        this.setState({
            startY: e.targetTouches[0].clientY
        })
    };
    handleTouchMove = (e) => {
        const moveHeight = this.state.startY - e.changedTouches[0].clientY;
        console.log(moveHeight);
        console.log(this.state.tips);
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
            moveY: moveHeight
        });

    };
    handleTouchEnd = (e) => {
        console.log('滑动结束')
        const moveHeight = this.state.startY - e.changedTouches[0].clientY;
        if(moveHeight > 60){
            this.setState({
                moveY: 40,
                tips: '加载中...'
            });

            setTimeout(()=>{
                this.setState({
                    tips: '加载成功',
                    moveY: 0,
                    showTips: false,
                });
            },2000)

        }else{
            this.setState({
                moveY: 0,
                showTips: false,
            });
        }
    };


    render(){
        const {children} = this.props;
        const {showTips} = this.state;
        const style = {
            transform:`translate3d(0, ${-this.state.moveY}px, 0)`,

        }
        return(
            <div className='yg-pull-load'>
                <div className='content'
                    onTouchStart={this.handleTouchStar}
                    onTouchMove={this.handleTouchMove}
                    onTouchEnd={this.handleTouchEnd}
                    style={style}
                >{children}</div>
                <div className={`tips ${showTips ?'show':''}`}>{this.state.tips}</div>
            </div>
        )
    }
}
