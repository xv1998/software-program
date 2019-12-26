<template>
    <div id="container">
        <el-tabs tab-position="left" v-model="activeNames">
            <el-tab-pane label="收藏管理" style="height:100vh;" name="first">
                <div class="rightSide">
                    <ul>
                        <li class="displayLi" :key="item.id" v-for="(item,index) in bookIdList"
                            @click.stop="showDetail(index)">
                            <div class="left">
                                <div><span>书名：</span><span>《{{item.bookname}}》</span></div>
                                <div><span>作者：</span><span>{{item.writer}}</span></div>
                                <div><span>出版社：</span><span>{{item.press}}</span></div>
                                <div><span>书评：</span><span>{{item.description}}</span></div>
                                <div><span>发布时间：</span><span>{{item.uploaddatetime}}</span></div>
                                <div><span>图书状态：</span><span>{{item.state}}</span></div>
                            </div>
                            <div class="right">
                                <img :src="item.photourls">
                            </div>
                        </li>
                    </ul>
                    <menubar></menubar>
                    <bookDetailPage :bookId="bookDetail.bookId" :collect="bookDetail.collect"
                                    :isDonated="bookDetail.isdonated"
                                    :ispicked="bookDetail.ispicked" :bookImg="bookDetail.photourls"
                                    :showDialog="showDialog"
                                    :bookIntro="bookDetail.description" :bookName="bookDetail.bookname"
                                    v-on:close="closeDialog"></bookDetailPage>
                </div>
            </el-tab-pane>
            <el-tab-pane label="订单管理" style="height:100vh;" name="second">
                <div class="orderPage">
                    <div class="block">
                        <el-timeline>
                            <div v-for="(order,index) in orders" :key="index">
                            <el-timeline-item :timestamp="processTime(order.submittime)" placement="top">
                                <el-card>
                                    <div class="card">
                                    <div class="leftCard">
                                        <div class="orderBookpic"><img :src="order.bookinfos.coverurl"></div>
                                        <div class="orderId">订单号:{{order.oid}}</div>
                                    </div>
                                    <div class="rightCard">
                                    <div class="orderBook">书名:{{order.bookinfos.bookname}}</div>
                                        <div class="nameCard">
                                            <div class="left-name">
                                                <div class="consignee">{{order.name}}</div></div>
                                                <div class="rightT">
                                                    <div class="phone">{{order.phonenumber}}</div>
                                                    <div class="address">{{order.address}}</div>

                                                </div>

                                        </div>



                                    </div>
                                    </div>
                                </el-card>
                            </el-timeline-item>
                            </div>
                        </el-timeline>
                    </div>
                    <menubar></menubar>
                </div>
            </el-tab-pane>
        </el-tabs>

    </div>

</template>
<script>

    //请注意这个是收藏页面
    import {api} from '../../request/api'

    import menubar from '../../components/common/menu.vue'
    import bookDetailPage from '../../components/common/book-detail-page.vue'

    export default {
        name: "softwarepart",
        components: {
            menubar,
            bookDetailPage,
        },
        data() {
            return {
                orders:[],
                bookIdList: [],
                activeNames: 'second',
                showDialog: false,
                bookDetail: {
                    bookname: "",
                    writer: "",
                    press: "",
                    description: "",
                    photourls: "",
                    ispicked: false,
                    isdonated: false,
                    donateTo: 1,
                    collect: true,
                    uploaddatetime: "",
                    bookId: 1
                }
            }
        },
        mounted() {
            const that = this
            let data = this.$route.params
            if (JSON.stringify(data)!=='{}') {
                this.activeNames = data.activeNames
            }
            this.$http.post('/getStarInfos/').then(res => {
                if (res.data.msg === 'success') {
                    localStorage.setItem('user_bottle', JSON.stringify(res.data.bottles))
                    // 1：未入库 2：已入库 3：已拒收 4：已捐赠
                    let arr = res.data.bottles;
                    let len = arr.length
                    for (let i = 0; i < len; i++) {
                        switch (arr[i].state) {
                            case 1:
                                arr[i].state = "未入库";
                                break
                            case 2:
                                arr[i].state = "已入库";
                                break
                            case 3:
                                arr[i].state = "已拒收";
                                break
                            case 4:
                                arr[i].state = "已捐赠";
                                break
                        }
                        if (arr[i].belong == 0)
                            that.bookIdList.push(arr[i]);
                    }
                    window.console.log("BOOKIDLIST:", that.bookIdList);
                } else {
                    that.$message.error(res.data.msg)
                }
            })
            that.getOrder()
        },
        methods: {
            showDetail: function (index) {
                window.console.log("INDEX:", index)
                this.bookDetail.bookname = this.bookIdList[index].bookname;
                this.bookDetail.press = this.bookIdList[index].press
                this.bookDetail.description = this.bookIdList[index].description
                this.bookDetail.photourls = this.bookIdList[index].photourls
                this.bookDetail.collect = true
                this.bookDetail.uploaddatetime = this.bookIdList[index].uploaddatetime
                this.showDialog = true;
            },
            processTime:function(time){
                let proTime=time.split('.')[0]
                return proTime
            },
            getOrder: function () {
                let that= this
                that.$http.post(api.getOrder).then(res => {
                    let data = res.data
                    if(data.msg.indexOf('success')!=-1){
                        this.orders=data.orders.reverse()
                        console.log(this.orders)
                    }
                    console.log(res)
                }).catch(e=>{
                    console.log(e)
                })
            },
            closeDialog: function (show) {
                this.showDialog = show
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }

</script>
<style scoped>
    #container {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        position: absolute;
        /* border: 1px solid aqua; */
        margin: 0 auto;
    }
    .nameCard{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    ul {
        list-style: none;
        padding: 0;
        margin-left: 10%;
        width: 80%;
        position: absolute;
    }

    .el-tabs {
        margin: auto 0;
    }

    .orderPage {
        padding: 20px 0;
    }

    .displayLi {
        width: 100%;
        height: 25%;
        max-height: 250px;
        border: 1px solid aqua;
        display: flex;
    }
    .card{
        display:flex;
        flex-direction: row;

    }
    .orderBook{
        font-size:20px;
    }
    .el-card__body{
        width:500px;

    }
    .rightCard{
        padding:5px;
        color:black;
        width:200px;
        display: flex;
        flex-direction: column;
    }

    .left {
        width: 77%;
        height: 98%;
        overflow: hidden;
        margin-left: 2%;
        margin-top: 1%;
        margin-bottom: 1%;
    }

    .left div:nth-child(2) {
        overflow: hidden;
    }

    .right {
        width: 19%;
        margin-top: 1%;
        margin-right: 2%;
        margin-bottom: 1%;
        display: flex;
    }
    .orderBookpic img{
        max-width: 200px;
        max-height:200px;
        height:auto;
        width:auto;
    }
    .right img {
        width: 100%;
        height: 100%;
        max-height: 120px;
        margin: auto;
    }

    span {
        font-size: 1em;
        font-weight: 800;
        color: rgb(49, 197, 185);
    }
</style>
