<template>
    <section class="getBook_Container" v-cloak>
        <meta name="referrer" content="no-referrer"/>
        <div class="back"><img src="../../assets/back.png"></div>
        <div class="bookContainer">

            <div class="bookname">{{bookinfo.bookname}}</div>
            <div class="bookInfo">
                <div class="left-side">
                    <div class="book-pic-container">
                        <img :src="bookinfo.bookpic"/>
                    </div>
                    <div class="detailInfo">
                        <div class="writer">作者:{{bookinfo.writer}}</div>
                        <div class="press">出版社:{{bookinfo.press}}</div>
                        <div class="OriginName">原作名:</div>
                        <div class="translator">译者:</div>
                        <div class="publishDate">出版年月日:</div>
                        <div class="page">页数:</div>
                    </div>
                </div>
                <div class="description">
                    <div class="descriptionTitle">内容简介</div>
                    <div class="bookdescription">{{bookinfo.description}}</div>
                </div>
            </div>
        </div>
        <div class="address">
            <div class="addressTitle">收货地址</div>
            <div v-show="userinfo.address">
                <div class="addAddress"></div>
            </div>
            <el-button type="primary" @click="showDialog">添加新地址</el-button>
                <!--todo:改成弹框-->
            <addNewAddress></addNewAddress>

        </div>
        <div class="submit">
            <el-button type="danger">提交</el-button>
        </div>
    </section>
</template>

<script>
    import { api } from '../../request/api'
    import addNewAddress from '../../components/common/addNewAddress'


    export default {
        name: "getBook",
        data() {
            return {
                bookInfo: {
                    "bookname": "好笑的爱",
                    "writer": "米兰昆德拉",
                    "press": "unknown"
                },
                bookinfo: {},
                userinfo: {},
                form: {}
            }
        },
        mounted: function () {
            this.getBook(this.bookInfo);
        },
        components:{
            addNewAddress
        },
        methods: {
            getBook: function (bookInfo) {
                let that = this
                this.$http.post(api.getBook, bookInfo).then((response => {
                    let res = response.body
                    // TODO 增加返回失败的弹框提示
                    if (res.msg.indexOf('success') != -1) {
                        let bookinfo = {
                            "bookname": res.bookname,
                            "bookpic": res.coverurl,
                            "description": res.description,
                            "neededcredit": res.neededcredit,
                            "writer": res.writer,
                            "press": res.press
                        }
                        that.bookinfo = bookinfo
                    }
                }))
            },
            getUserInfo: function () {

            },
            showDialog: function () {
                let that = this
                that.showModel = true
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
    }

    .left-side {
        display: flex;
        flex-direction: row;
    }

    [v-cloak] {
        display: none;
    }
</style>
