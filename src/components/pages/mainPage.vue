<template>
    <div id="mainPage">
<!--        <canvas></canvas>-->
        <menubar :manager="ismanager" class="menu"></menubar>
        <bookDetailPage :key="timer" ref="bookDetail" :bookId="bookDetail.botid" :collect="bookDetail.collect" :isDonated="bookDetail.isdonated" :ispicked="bookDetail.ispicked" :bookImg="bookDetail.photourls" :showDialog="showDialog" :bookIntro="bookDetail.description" :bookName="bookDetail.bookname" v-on:close="closeDialog" :state="bookDetail.state"></bookDetailPage>
    </div>
</template>

<script>
import bookDetailPage from '../../components/common/book-detail-page.vue'
import menubar from '../../components/common/menu.vue'
// import $ from 'jquery'
// import Stats from '../../assets/js/Stats'

export default {
    name: "mainPage",
    components: {
        bookDetailPage,
        menubar,
    },
    data() {
        return {
            ismanager:"",
            showDialog: false,
            oid: 0,
            timer: '',
            bookDetail:{
                botid:0,
                bookname: "",
                writer: "",
                press: "",
                state:0,
                description: "",
                photourls: "",
                ispicked: false,
                isdonated: false,
                donateTo: 1,
                collect: false,
                uploaddatetime: "",
            }
        }
    },
    created:function() {
        this.Global.bottleNum = parseInt(localStorage.getItem('bottleNum'))
        // window.console.log(this.manager)
    },
    mounted (){
        this.inition()
        this.getCollected()
        const that = this
        this.$http.post('/getAllOrders/').then(res =>{
            if (res.data.msg === 'success') {
                localStorage.setItem('orderList',JSON.stringify(res.data.orders))
            }else{
                that.$message.error(res.data.msg)
            }
        })
        this.ismanager = JSON.parse(localStorage.getItem('user_info')).issuper
    },
    methods: {
        // 显示图书内容
        showDetail: function () {
            const that = this
            let id = (Math.ceil(Math.random()*that.Global.bottleNum))
            // window.console.log(id)
            this.$http.post('/visBottle/',{ 'idx': id}).then(res=>{
                if (res.data.msg === 'success') {
                    const bottles = JSON.parse(localStorage.getItem('user_bottle'))
                    res.data.collect = false
                    if (bottles.length !== 0) {
                        bottles.forEach(item=>{
                            if (item.botid === res.data.botid) {
                                res.data.collect = true
                            }
                        })
                    }
                    that.bookDetail = res.data
                    window.console.log(that.bookDetail)
                }else{
                    that.$message.error(res.data.msg)
                }
            })
            this.timer = new Date().getTime()
            this.showDialog = true
        },
        // 关闭卡片
        closeDialog: function (show) {
            this.showDialog = show
        },
        // 初始化
        inition: function () {
            let _this = this
            var Dots = function (speed, alpha) {
                // 画布相关
                this.canvas;
                this.ctx;

                // 绘制点相关
                this.x = 0;
                this.y = 0;
                this.r = 0;
                this.a = alpha && alpha > 0 && alpha <= 1 ? alpha : .8;

                // 移动相关
                this.speed = speed && speed > 0 ? speed : 2;
                this.sx = 0;
                this.sy = 0;
                this.isMouseDot = 0;
            };

            Dots.prototype = {
                // 初始化点的方法 x/y为可选参数 为生成点的位置 不传则随机生成
                init: function (canvas, x, y, isMouseDot) {
                    this.canvas = canvas;
                    this.ctx = this.canvas.getContext('2d');

                    this.x = x || Math.random() * this.canvas.width;
                    this.y = y || Math.random() * this.canvas.height;
                    this.r = Math.random() * 6; // 随机生成 <6 的半径值

                    if (isMouseDot) {
                        this.isMouseDot = 1
                    }

                    // 随机确定点的移动速度与方向 速度值在 [-this.speed, this.speed) 之间 提高数值可加快速度
                    this.sx = isMouseDot ? 0 : Math.random() * this.speed * 2 - this.speed;
                    this.sy = isMouseDot ? 0 : Math.random() * this.speed * 2 - this.speed;

                    this.ctx.beginPath();
                    this.ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
                    this.ctx.fillStyle = 'rgba(255,255,255,'+this.a+')';
                    this.ctx.fill();
                    this.ctx.closePath();
                },

                // 更新点位置
                update: function () {
                    if (this.isMouseDot) return;

                    this.x = this.x + this.sx;
                    this.y = this.y + this.sy;

                    // 点超出canvas范围时另其"重生"
                    if (this.x < 0 || this.x > this.canvas.width) {
                        this.init(this.canvas);
                    }
                    if (this.y < 0 || this.y > this.canvas.height) {
                        this.init(this.canvas);
                    }

                    this.ctx.beginPath();
                    this.ctx.arc(this.x, this.y, this.r + 0.5, 0, 2*Math.PI);
                    this.ctx.fillStyle = 'rgba(255,255,255,'+this.a+')';
                    this.ctx.fill();
                    this.ctx.closePath();
                },

                // 跟踪鼠标的点的位置更新 x/y为鼠标位置
                mouseDot: function (x, y) {
                    this.x = x;
                    this.y = y;
                    this.ctx.beginPath();
                    this.ctx.arc(this.x, this.y, this.r + 0.5, 0, 2*Math.PI);
                    this.ctx.fillStyle = 'rgba(255,255,255,'+this.a+')';
                    this.ctx.fill();
                    this.ctx.closePath();
                }
            };

            /**
             * Created by troyxu on 16/12/6.
             */
            function Wonder (opts) {

                var part = document.querySelector(opts.el),
                    canvas = document.createElement('canvas'),
                    ctx = canvas.getContext('2d'),

                    partStyle = window.getComputedStyle(part, null),
                    width = parseInt(partStyle.width),
                    height = parseInt(partStyle.height),
                    area = width * height, // canvas区域面积
                    cssText = 'width: '+width+'px; height: '+height+'px;';

                canvas.setAttribute('style', cssText);
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                part.appendChild(canvas);

                var dotsArr = [],
                    dotsNum = opts.dotsNumber || area / 5000,
                    maxDotsNum = dotsNum * 2,
                    overNum = 0, // 超出最大数量的点的数量
                    dotsDistance = opts.lineMaxLength || 250; // 点之间产生连线的最大距离

                //生成点
                for (let i = 0; i < dotsNum; i++) {
                    let dot = new Dots(opts.speed, opts.dotsAlpha);
                    if (i < dotsNum - 1) {
                        dot.init(canvas);
                    } else {
                        dot.init(canvas, 0, 0, 1);
                    }
                    dotsArr.push(dot);
                }

                //鼠标事件
                // var clickWithNew = opts.clickWithDotsNumber || 5;
                document.addEventListener('click', createDot);
                function createDot(e) {
                    let tx = e.pageX,
                        ty = e.pageY;
                    if (!_this.showDialog) {
                        // window.console.log(ty, tx)
                        if ((tx > 0 && tx < width) && (ty > 0 && ty < height)) {

                            let dotsmap = dotsArr.concat()
                            dotsmap.forEach(item =>{
                                // window.console.log(Math.floor(item.y))
                                let x = Math.round(item.x)
                                let y = Math.round(item.y)
                                // window.console.log(y ,x)
                                if ( (ty-5) <= y && y <= (ty+5)&&(tx-5) <= x && x <= (tx+5)) {
                                    // window.console.log('点中了！')
                                    _this.showDetail()
                                }
                            })
                            // for (let i = 0; i < clickWithNew; i ++) {
                            //     let dot = new Dots(opts.speed, opts.dotsAlpha);
                            //     dotsArr.push(dot);
                            //     dotsNum += 1;
                            //     dot.init(canvas, tx, ty);
                            // }
                        }
                    }
                }

                canvas.addEventListener('mouseenter', mouseDotEnter);
                canvas.addEventListener('mousemove', mouseDotMove);
                canvas.addEventListener('mouseleave', mouseDotLeave);
                let dot = new Dots(opts.speed, opts.dotsAlpha);
                function mouseDotEnter(e) {
                    let tx = e.pageX,
                        ty = e.pageY;
                    dot.init(canvas, tx, ty, 1);
                }
                function mouseDotMove(e) {
                    let tx = e.pageX,
                        ty = e.pageY;
                    if ((tx > 0 && tx < width) && (ty > 0 && ty < height)) {
                        dot.mouseDot(tx, ty);
                    }
                }
                function mouseDotLeave() {
                    dot.init(canvas);
                }

                //动画与连线
                requestAnimationFrame(animateUpdate);

                function animateUpdate() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空canvas中原有的内容

                    // 更新点的位置 数量超出最大值时舍弃旧的点
                    if (dotsNum > maxDotsNum) {
                        overNum = dotsNum - maxDotsNum;
                    }

                    for (let i = overNum; i < dotsNum; i++) {
                        // if (dotsArr[i].isMouseDot) console.log('aaa')
                        if (dotsArr[i]) dotsArr[i].update();
                    }

                    // 绘制连线
                    for (let i = overNum; i < dotsNum; i ++) {
                        for (let j = i + 1; j < dotsNum; j ++) {
                            // if (dotsArr[i].isMouseDot) console.log('bbb')
                            // if (dotsArr[j].isMouseDot) console.log('ccc')
                            let tx = dotsArr[i].x - dotsArr[j].x,
                                ty = dotsArr[i].y - dotsArr[j].y,
                                s = Math.sqrt(Math.pow(tx, 2) + Math.pow(ty, 2));
                            if (s < dotsDistance) {
                                ctx.beginPath();
                                ctx.moveTo(dotsArr[i].x, dotsArr[i].y);
                                ctx.lineTo(dotsArr[j].x, dotsArr[j].y);
                                ctx.strokeStyle = 'rgba(255,255,255,'+(dotsDistance-s)/dotsDistance+')';
                                ctx.strokeWidth = 1;
                                ctx.stroke();
                                ctx.closePath();
                            }
                        }
                    }

                    requestAnimationFrame(animateUpdate);
                }
            }
            new Wonder({
                el: '#mainPage',
                dotsNumber: 100,
                lineMaxLength: 100,
                dotsAlpha: .5,
                speed: 0.1,
                clickWithDotsNumber: 5
            })
        },
        // 获取用户收藏记录
        getCollected: function () {
            const that = this
            this.$http.post('/getStarInfos/').then(res=>{
                if (res.data.msg === 'success') {
                    window.console.log(res.data)
                    localStorage.setItem('user_bottle', JSON.stringify(res.data.bottles))
                }else{
                    that.$message.error(res.data.msg)
                }
            })
        }
    },
}
</script>

<style scoped>
#mainPage {
    z-index: -1;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: #111;
}
</style>
