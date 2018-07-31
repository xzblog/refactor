/*
 * 幻灯片
 * @Author: Magical
 */

import React, {Component} from 'react';
import classNames from 'classnames';
import "./carousel.scss";


export default class Carousel extends Component{
    static defaultProps = {
        speed: 0.6,        // 过渡时间
        delay: 3,          // 滑动间隔s
        autoplay: false,   // 自动播放
        dots: true,        // 是否显示底部点点
        loop: true,        // 是否循环
    };

	state = {
	    activeIndex: 0,        // 当前是第几个
	    startX: 0,             // 鼠标开始的位置
	    movedWith:0,           // 滑动的距离
	};


    timer = null;   //用来中途停止自动播放的。
	style = null;   //控制样式

    // 向前向后滑动几个slide
    turn = (num) =>{
    	const {children, speed, loop} = this.props;
    	const {activeIndex} = this.state;
        const count = React.Children.count(children);  //得到slide的个数
        let n = (activeIndex) + num;

        if(loop && count > 1){
            if(n < 0){
                setTimeout(()=>{
                    this.style = {
                        transitionDuration: 'unset'
                    };
                    this.setState({
                        activeIndex: n + count
                    })
                },speed*1000)

            }else if(n >= count){
                setTimeout(()=>{
                    this.style = {
                        transitionDuration: 'unset'
                    };
                    this.setState({
                        activeIndex: n - count
                    })
                },speed*1000)
            }else{
                this.style = null
            }
        }else{
            if(n < 0){
                n = 0;
            }
            if(n >= count){
                n = count-1
            }
        }



        this.setState({activeIndex: n});
    };


    // 自动轮播
    autoPlay = () => {
    	const {autoplay, delay, children} = this.props;
        if(autoplay && children.length) {
            this.timer = setInterval(() => {
                this.turn(1);
            }, delay * 1000);
        }
    };

    handleTouchStart = (e) =>{
        clearInterval(this.timer);  // 在操作时停止自动轮播
        this.setState({
            startX: e.changedTouches[0].pageX,
        });
        this.style = {
        	transitionDuration: 'unset'
        }
    };

    handleTouchMove = (e) =>{
        const onMoveWidth = e.changedTouches[0].pageX -this.state.startX;
        this.setState({
            movedWith: onMoveWidth
        });
    };

    handleTouchEnd = (e) =>{
        const moveWidth =  e.changedTouches[0].pageX - this.state.startX;
        if(moveWidth > 100){      // 当滑动距离超过一百的时候才触发翻动效果
            this.turn(-1)
        }else if(moveWidth < -100){
            this.turn(1)
        }
        this.setState({
            movedWith: 0,
        });

        this.style = null;
        this.autoPlay();    //操作的时候停止播放， 操作完成继续
    };

    componentDidMount() {
        this.autoPlay();
    }

    render() {
        const {speed, children, className, dots, loop } = this.props;
        const {activeIndex, movedWith} = this.state;

        const count = React.Children.count(children);                  // 实际slide的个数
        const newCount = count === 1 ? count : count + 2;              // slide大于1的时给他加2，用于无限训循环

        const clientWidth = document.body.clientWidth;         // 当前屏幕的宽度或者外容器的宽度

        const index = loop && count > 1 ? activeIndex + 1 : activeIndex;

        const moveW = (- clientWidth * index) + movedWith;
        const style = {
            transform: `translate3d(${moveW}px, 0, 0)`,
            transitionDuration: speed + "s",
            width: newCount * clientWidth + "px",
            ...this.style
        };

        const cls = classNames({
            'yg-carousel': true,
            [className] : className
        });

        // 处理children， 当大于1个的时候， 克隆第一个和最后个
        const newChildren = children.length > 1 ? children.slice(-1).concat(children).concat(children[0]) : children;

        return (
            <div className={cls}
                onTouchStart={this.handleTouchStart}
                onTouchMove={this.handleTouchMove}
                onTouchEnd={this.handleTouchEnd}
            >
                <div className='yg-carousel-wrap' style={style} >
                    {
                        React.Children.map(newChildren, function (child) {
                            return <div className="slide" style={{width: clientWidth}}>{child}</div>;
                        })
                    }
                </div>

                {dots && count > 1 ? <Dots count={count} activeIndex={activeIndex} /> : null}
            </div>
        );
    }
}



/*
 * 下面的点
 */
class Dots extends Component {
    render() {
        let dotNodes = [];
        const { count, activeIndex } = this.props;
        for(let i = 0; i < count; i++) {
            dotNodes[i] = (
                <span
                    key={i}
                    className={i === activeIndex ? " dot-active": null}>
                </span>
            );
        }
        return (
            <div className="slider-dots">
                {dotNodes}
            </div>
        );
    }
}



