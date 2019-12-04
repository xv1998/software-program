<template>
    <section class="getBook_Container" v-cloak>
        <meta name="referrer" content="no-referrer"/>
        <div class="back"><img src="../../assets/back.png"></div>
        <div class="bookContainer">
            <div class="bookname">《{{bookinfo.bookname}}》</div>
            <div class="bookInfo">

                <div class="book-pic-container">
                    <img :src="bookinfo.bookpic"/>
                </div>
                <div class="bookdescription">{{bookinfo.description}}</div>
            </div>
        </div>
    </section>
</template>

<script>
    import { api } from '../../request/api'

    export default {
        name: "getBook",
        data() {
            return {
                bookInfo: {
                    "bookname": "好笑的爱",
                    "writer": "米兰昆德拉",
                    "press": "unknown"
                },
                bookinfo: {}
            }
        },
        mounted: function () {
            this.getBook(this.bookInfo);
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
        padding: 0 2em;
    }

    .bookContainer {
        display: flex;
        flex-direction: column;
    }

    .book-pic-container {
        height: 5em;
        width: 5em;
        border: 0.01em rgba(119, 136, 153, 0.4) bold;
    }

    .book-pic-container img {
        max-height: 4.9em;
        max-width: 4.9em;
        height: auto;
        width: auto;
    }

    .bookname {
        font-size: .24em;
    }

    .bookInfo {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .back {
        position: absolute;
        left:0.2em;
        top:0;
    }
    .back img{
        height:0.5em;
        width:0.5em;
    }

    [v-cloak] {
        display: none;
    }
</style>
