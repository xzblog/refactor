/*
 * 幻灯片
 * @Author: Magical
 */

import React, {Component} from 'react';
import classNames from 'classnames';
import "./carousel.scss";


export default class Carousel extends Component{
    static defaultProps = {
        speed: 0.6,        //过渡时间
        delay: 3,        //滑动间隔s
        autoplay: false,  //自动播放
        dots: true,      //是否显示底部点点
        items: [],       //传入的参数
    };

	state = {
	    activeIndex: 1,        //当前是第几个
	    startX: 0,             //鼠标开始的位置
	    movedWith:0,           //滑动的距离
	};


    timer = null;   //用来中途停止自动播放的。
	style = null;   //控制样式


    // 向前向后滑动几个slide
    turn = (num) =>{
    	const {items, speed} = this.props;
        const count = items.length;  //得到slide的个数
        let n = this.state.activeIndex + num;

        // 不让循环
        // if(n < 0){
        //     n = 0;
        // }
        // if(n >= count){
        //     n = count-1
        // }

        // 循环
        if(n < 1){
            setTimeout(()=>{
                this.style = {
                    transitionDuration: 'unset'
                };
                this.setState({
                    activeIndex: n + count
                })
            },speed*1000)

        }else if(n > count){
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

        this.setState({activeIndex: n});
    };


    // 自动轮播
    autoPlay = () => {
    	const {autoplay, items} = this.props;
        // if(autoplay && items.length > 1) {
        if(autoplay) {
            this.timer = setInterval(() => {
                this.turn(1);
            }, this.props.delay * 1000);
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
        if(moveWidth > 100){      //当滑动距离超过一百的时候才触发翻动效果
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
        const {speed, items, } = this.props;
        const {activeIndex, movedWith} = this.state;

        const count = items.length;                      //当前slide的个数

        const clientWidth = document.body.clientWidth;         //当前屏幕的宽度

        const moveW = (- clientWidth * activeIndex) + movedWith;
        const style = {
            transform: `translate3d(${moveW}px, 0, 0)`,
            transitionDuration: speed + "s",
            width: (count + 2) * clientWidth + "px",
            ...this.style
        };

        const doubleItems = items.length > 1 ? items.slice(-1).concat(items).concat(items[0]) : items;    //大于1个克隆第一个和最后个

        const itemNodes = doubleItems.map((item, i) => {
            return <SliderItem item={item} count={count} key={i} />;
        });

        const dotsNode = <Dots count={count} activeIndex={activeIndex} />;

        const cls = classNames({
            'yg-carousel': true,
            [this.props.className] : this.props.className
        });

        return (
            <div className={cls}
                onTouchStart={this.handleTouchStart}
                onTouchMove={this.handleTouchMove}
                onTouchEnd={this.handleTouchEnd}
            >
                <div className='yg-carousel-wrap' style={style} >
                    {itemNodes}
                </div>
                {this.props.dots && count > 1 ? dotsNode : null}
            </div>
        );
    }
}

/*
 * 单个项
 */
class SliderItem extends Component {
    render() {
        let { count, item } = this.props;
        let width = 100 / (count + 2) + '%';
        return (
            <div className="slide" style={{width: width}}>
                <img src={item.pic} alt={item.alt} />
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
                    className={i === activeIndex -1 ? " dot-active" : ""}>
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



