<template>
    <section class="getBook_Container" v-cloak>
        <meta name="referrer" content="no-referrer"/>
        <div class="back"><img src="../../assets/back.png"></div>
        <div class="bookContainer">

            <div class="bookname">{{bookInfo.bookname}}</div>
            <div class="bookInfo">
                <div class="left-side">
                    <div class="book-pic-container">
                        <img :src="bookInfo.bookpic"/>
                    </div>
                    <div class="detailInfo">
                        <div class="writer">作者:{{bookInfo.writer}}</div>
                        <div class="press">出版社:{{bookInfo.press}}</div>
                        <div class="OriginName">原作名:</div>
                        <div class="translator">译者:</div>
                        <div class="publishDate">出版年月日:</div>
                        <div class="page">页数:</div>
                    </div>
                </div>
                <div class="description">
                    <div class="descriptionTitle">内容简介</div>
                    <div class="bookdescription">{{bookInfo.description}}</div>
                </div>
            </div>
        </div>
        <div class="address">
            <div class="addressTitle">收货地址</div>
            <div v-show="address">
                <div v-for="item in address" :key="item">
                    <div class="radioClass">
                        <el-radio border>{{item.name}}</el-radio>
                        <div class="addressInfo">
                            {{item.name}} {{item.province}} {{item.city}} {{item.district}} {{item.specific}}
                            {{hidePhone(item.phonenumber)}}
                        </div>
                    </div>
                </div>
            </div>
            <el-button type="primary" @click="showDialog">添加新地址</el-button>
            <!--todo:改成弹框-->
            <addNewAddress :showModel="showModel"></addNewAddress>

        </div>
        <div class="submit">
            <el-button type="danger">提交</el-button>
        </div>
    </section>
</template>

<script>
    import { api } from '../../request/api'
    import addNewAddress from '../../components/common/addNewAddress'
    import { hidePhone } from '../../libs/getBookFunc'


    export default {
        name: "getBook",
        data() {
            return {
                bookInfo: {},
                userinfo: {},
                form: {},
                radio: 1,
                showModel: false,
                address: []
            }
        },
        mounted: function () {
            let that = this
            let data = this.$route.params
            that.bookInfo = {
                bookname: data.bookName,
                writer: data.writer,
                press: data.press
            }
            // TODO 如果无数据或者无cookie 检查
            let userinfo = this.getUserInfo()
            userinfo = JSON.parse(userinfo)
            let address = JSON.parse(userinfo.address)
            this.address = address.address
            // TODO 将地址分成数组
            this.getBook(this.bookInfo);

        },
        components: {
            addNewAddress
        },
        methods: {
            getBook: function (bookInfo) {
                let that = this
                this.$http.post("/getBookInfos/", {
                    "bookname": that.bookInfo.bookname,
                    "writer": that.bookInfo.writer,
                    "press": that.bookInfo.press
                }).then((response => {
                    let res = response.data
                    // TODO 增加返回失败的弹框提示
                    if (res.msg.indexOf('success') !== -1) {
                        let bookInfo = {
                            "bookname": res.bookname,
                            "bookpic": res.coverurl,
                            "description": res.description,
                            "neededcredit": res.neededcredit,
                            "writer": res.writer,
                            "press": res.press
                        }
                        that.bookInfo = bookInfo
                    }
                }))
            },
            getUserInfo: function () {
                let userinfo = localStorage.getItem('user_info')
                return userinfo
            },
            hidePhone: function (phone) {
                let replace = '****'
                let pre = phone.substring(0, 3)
                let last = phone.substring(7, 11)
                let hidephone = pre + replace + last;
                return hidephone
            },
            showDialog: function () {
                this.showModel = true
            },
            closeDialog: function () {
                this.showModel = false
            }
        }
    }
</script>

<style scoped>

    @media screen and (min-width: 1921px) {

        .getBook_Container {
            font-size: 108px;
        }
    }

    @media screen and (max-width: 1920px) and (min-width: 1521px) {

        .getBook_Container {
            font-size: 100px;
        }

    }

    @media screen and (max-width: 1520px) and (min-width: 1281px) {
        body {
        }

        .getBook_Container {
            font-size: 80px;
        }
    }

    @media screen and (max-width: 1280px) and (min-width: 1024px) {
        body {
        }

        .getBook_Container {
            font-size: 66px;
        }
    }

    @media screen and (min-width: 1024px) {
        body {
        }
    }

    @media screen and (max-width: 1023px) {
        body {
        }
    }

    @media screen and (max-width: 1023px), screen and (max-height: 767px) {
        .getBook_Container {
            font-size: 66px;
        }
    }

    .getBook_Container {
        padding: 0 2em 0.4em;
        font-family: "Microsoft YaHei", sans-serif;
    }

    .bookContainer {
        display: flex;
        flex-direction: column;
        padding: 0.6em 0;
    }

    .book-pic-container {

    }

    .radioClass {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .addressInfo {
        font-size: 14px;
    }

    .book-pic-container img {
        max-width: 2em;
        height: auto;
        width: auto;
    }

    .bookname {
        font-size: .3em;
        color: #393e46;
        letter-spacing: 0.1em;
    }

    .bookInfo {
        display: flex;
        flex-direction: row;
        margin-top: 0.1em;
    }

    .back img {
        height: 0.5em;
        width: 0.5em;
    }

    .back {
        display: flex;
        align-item: center;
        position: absolute;
        left: 0.2em;
        top: 0.2em;
    }

    .bookdescription {
        font-size: 0.24em;
    }

    .descriptionTitle {
        font-size: 0.3em;
    }

    .description {
        border-left: 0.01em #bbbbbb solid;
        padding-left: 0.1em;
        margin-left: 0.6em;
    }

    .detailInfo {
        font-family: "Microsoft YaHei", sans-serif;
        font-size: .24em;
        margin-left: 0.5em;
    }

    .addressTitle {
        font-size: 0.3em;
        margin-bottom:.3em;
    }

    .left-side {
        display: flex;
        flex-direction: row;
    }

    [v-cloak] {
        display: none;
    }
</style>
