<template>
    <section class="getBook_Container" v-cloak>
        <meta name="referrer" content="no-referrer"/>
        <div class="back" @click="backTo"><img src="../../assets/back.png"></div>
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
                <div v-for="(item,index) in address" :key="index" @change="onCheckradio(index)">
                    <div class="radioClass">
                        <el-radio v-model="radio" :label="index" border>{{item.name}}</el-radio>
                        <div class="addressInfo">
                            {{item.name}} {{item.province}} {{item.city}} {{item.district}} {{item.specific}}
                            {{hidePhone(item.phonenumber)}}
                        </div>
                        <el-tag type="info" v-show="item.isDefault">默认地址</el-tag>
                        <div class="edit hoverShow" @click="editAddress(index)">编辑</div>
                        <div class="delete hoverShow" @click="deleteAddress(index)">删除</div>
                        <div class="setDefault hoverShow" v-show="!item.isDefault" @click="setDefault(index)">设为默认地址
                        </div>
                    </div>
                </div>
            </div>
            <el-button type="primary" @click="showDialog">添加新地址</el-button>
            <addNewAddress :showModel="showModel" :form="form" v-on:address="addNewAddress"
                           @close="closeDialog"></addNewAddress>
        </div>
        <div class="credit">
            <div class="needed_credit">
                该书需要:{{bookInfo.neededcredit}}
            </div>
            <div class="user_credit">
                你的积分:{{userinfo.credit}}
            </div>
            <div class="rest">
                剩余积分:{{countCredit}}
            </div>
        </div>
        <div class="submit">
            <el-button type="danger" @click="pickBook">提交</el-button>
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
                radio: 0,
                showModel: false,
                address: [],
                selectedAddress: 0
            }
        },
        mounted: function () {
            let that = this
            let data = this.$route.params
            let bookInfo = {
                bookname: data.bookName,
                writer: data.writer,
                press: data.press,
            }
            this.botid = data.botid
            // TODO 如果无数据或者无cookie 检查
            let userinfo = this.getUserInfo()
            userinfo = JSON.parse(userinfo)
            this.address = JSON.parse(userinfo.address).address
            this.userinfo = userinfo
            this.bookInfo = bookInfo
            this.getBook(this.bookInfo);
        },
        components: {
            addNewAddress
        },
        computed: {
            countCredit: function () {
                return this.userinfo.credit - this.bookInfo.neededcredit
            }
        },
        methods: {
            getBook: function (bookInfo) {
                let that = this
                this.$http.post(api.getBook, {
                    "bookname": that.bookInfo.bookname,
                    "writer": that.bookInfo.writer,
                    "press": that.bookInfo.press
                }).then((response => {
                    let res = response.data
                    console.log(response)
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
                    else {
                        console.log(res)
                    }
                }))
            },
            backTo:function(){
                this.$router.push({
                    name:'mainPage'
                })
            },
            onCheckradio: function (item) {
                this.selectedAddress = item
            },
            updateUserinfo: function () {
                this.$http.post(api.getUserinfo).then(response => {
                    if (response.data.msg === 'success') {
                        window.console.log(response.data)
                        localStorage.setItem('user_info', JSON.stringify(response.data))
                    }
                }).catch(e => {
                    window.console.log(e)
                })
            },
            editAddress: function (index) {
                let address = this.address[index]
                this.form = address
                this.form.address = {
                    "province": address.province,
                    "city": address.city,
                    "district": address.district
                }
                this.form.index = index
                this.showModel = true
            },
            deleteAddress: function (index) {
                this.$confirm('您确定要删除该收货地址吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.address.splice(index, 1)
                    console.log(this.address)
                    this.postNewAddress(this.address)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            setDefault: function (index) {
                this.address[index].isDefault = true
                this.postNewAddress(this.address)
            },
            postNewAddress: function (address) {
                address = {
                    "address": this.address
                }
                let addressString = JSON.stringify(address)
                this.$http.post(api.update, {
                    "new_address": addressString
                }).then(response => {
                    if (response.data.msg === 'success') {
                        if (!Number.isInteger(address.index)) {
                            this.$message({
                                message: '添加地址成功',
                                type: 'success'
                            })
                        }
                    }
                    else if (response.data.msg === 'fail') {
                        this.$message.error('添加地址失败')
                    }
                }).catch(e => {

                })
                this.updateUserinfo()
            },
            pickBook: function () {
                let address = this.address[this.selectedAddress]
                this.$http.post(api.pickBook, {
                    "botid": this.botid,
                    "address": address
                }).then(response => {
                    console.log(response)
                    let res = response.data
                    if (res.msg.indexOf('success') !== -1) {
                        this.$router.push({
                            name: 'getBookRes'
                        })
                    } else {
                        if (res.msg.indexOf('not enought credit')) {
                            this.$message({
                                message: '您的积分不够哦！要多捐图书哦！',
                                duration: 6000,
                                type: 'error'
                            })
                        } else if (res.msg.indexOf('book not exist')) {
                            this.$message({
                                message: '该书已被取走了哦！在漂流海再捞一捞吧!',
                                duration: 6000,
                                type: 'error'
                            })
                        }
                        this.$router.push({
                            name: 'mainPage'
                        })
                    }
                }).catch(e=>{
                    console.log(e)
                })
            },
            addNewAddress: function (data) {
                let address = data
                let Address = address.address
                address.city = Address.city
                address.province = Address.province
                address.district = Address.district
                if (Number.isInteger(address.index)) {
                    this.address[address.index] = address
                    this.form = {}
                }
                else {
                    this.address.push(address)

                }
                this.showModel = false
                this.postNewAddress(address)
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
                let form = this.form
                if (!form) {
                    [form.province, form.city, form.distance] = ['', '', '']
                }
                this.showModel = true
            },
            closeDialog: function (data) {
                if (Number.isInteger(data)) {
                    this.form = {}
                }
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
        margin: .2em;
    }

    .el-radio {
        width: 120px;
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
        cursor:pointer;
    }

    .bookdescription {
        /*overflow : hidden;*/
        /*text-overflow: ellipsis;*/
        /*display: -webkit-box;*/
        /*-webkit-line-clamp: 3;*/
        /*-webkit-box-orient: vertical;*/
        /*height: 200px;*/

        /*word-break:break-all;*/
        font-size: .24em;
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
        width: 8.5em;
    }

    .addressTitle {
        font-size: 0.3em;
        margin-bottom: .3em;
    }

    .left-side {
        display: flex;
        flex-direction: row;
    }

    .edit, .delete, .setDefault {
        display: none;
    }

    .hoverShow {
        font-size: .2em;
        margin: 0 .8em;
        color: #4682B4;
        cursor: pointer;
    }

    .radioClass:hover {
        background: aliceblue;
    }

    .radioClass:hover .edit {
        display: block;
    }

    .radioClass:hover .delete {
        display: block;
    }

    .radioClass:hover .setDefault {
        display: block;
    }

    .credit {
        margin-top: .8em;
        font-size: .24em;
    }

    [v-cloak] {
        display: none;
    }
</style>
