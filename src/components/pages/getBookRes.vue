<template>
    <div class="container">
        <div class="top">
            <el-steps :space="600" :active="1" finish-status="success" align-center>
                <el-step title="已下单"></el-step>
                <el-step title="已发货"></el-step>
                <el-step title="订单完成"></el-step>
            </el-steps>
        </div>
    <div class="middle">
        <div class="item">
            <div class="name">《{{bookinfo.bookname}}》
            </div>
            <div class="pic"><img :src="bookinfo.bookpic"></div>
        </div>
        <div class="right">
            <div class="con">订单号:{{oid}}</div>
            <el-button class="clickButton" size="medium" type="danger" @click="move">查看所有订单</el-button>
        </div>
    </div>
        <menuPage class="menu"></menuPage>
    </div>
</template>

<script>
    import menuPage from '../../components/common/menu'

    export default {
        name: "getBookRes",
        data() {
            return {
                oid: 0,
                bookinfo: {}
            }
        },
        components: { menuPage },
        mounted: function () {
            let data = this.$route.params
            this.oid = data.oid
            this.bookinfo = data.bookinfo
        },
        methods:{
            move:function(){
                this.$router.push({
                    name:'Order-History'
                })
            }
        }

    }
</script>

<style scoped>
    .item {
        display: flex;
        flex-direction: column;
    }
    .middle{
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin:20px;
        align-items: center;
    }

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-self: center;
        padding:20px 40px;
    }

    .right{
        display: flex;
        flex-direction: column;
    }
    .con{
        font-size:40px;
    }
    .name{
        font-weight: bold;
        font-size:32px;
    }
    .clickButton{
        margin-top:30px;
        width:200px;
    }
    .pic{
        height:300px;
        width:300px;
        margin-top:10px;
    }
    img{
        max-height:300px;
        max-width: 300px;
        width:auto;
        height:auto;
    }
</style>
