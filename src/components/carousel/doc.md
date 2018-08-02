# 轮播组件Carousel

使用场景： 需要轮播的地方

简单示例

```html
<Carousel className="cont" autoplay>
    <span>1</span>
    <span>2</span>
    <span>3</span>
</Carousel>
```



api

| 属性          | 说明                 | 类型      | 默认值   |
| ----------- | ------------------ | ------- | ----- |
| dots        | 是否显示指示点            | Boolean | false |
| vertical    | 垂直显示               | Boolean | false |
| autoplay    | 是否自动切换             | Boolean | false |
| delay       | 自动切换的时间间隔（秒）       | Number  | 5     |
| loop        | 是否循环播放             | Boolean | true  |
| speed       | 切换时的过度时间(秒)        | Number  | 0.6   |
| num         | 每屏展示多少个slide (不完善) | Number  | 1     |
| activeIndex | 默认显示第几个（暂不支持）      | number  | 0     |





### future

* 一屏显示多个

* 默认显示第几个

* 循环滚动时的衔接处理

* 组件性能

  ​

