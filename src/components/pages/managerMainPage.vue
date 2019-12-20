<template>
    <el-container>
        <menubar class="menu"></menubar>
        <el-header class="header">
            <h3>管理员系统</h3>
<!--            <el-divider class="divider" direction="vertical"></el-divider>-->
<!--            <el-badge :value="12" class="item">-->
<!--                <el-button size="small">评论</el-button>-->
<!--            </el-badge>-->
        </el-header>
        <el-col :span="5" class="sideBar">
            <el-row >
                <el-col>
                    <el-menu
                            background-color="#545c64"
                            default-active="1"
                            class="el-menu-vertical-demo"
                            text-color="#fff"
                            active-text-color="#ffd04b"
                            @select="handleSelect">
                        <!--                        <el-submenu index="1">-->
                        <!--                            <template slot="title">-->
                        <!--                                <i class="el-icon-menu"></i>-->
                        <!--                                <span>订单管理</span>-->
                        <!--                            </template>-->
                        <!--                            <el-menu-item-group>-->
                        <!--                                <template slot="title">分组一</template>-->
                        <!--                                <el-menu-item index="1-1">选项1</el-menu-item>-->
                        <!--                                <el-menu-item index="1-2">选项2</el-menu-item>-->
                        <!--                            </el-menu-item-group>-->
                        <!--                        </el-submenu>-->
                        <el-menu-item index="1">
                            <i class="el-icon-tickets"></i>
                            <span slot="title">收书订单</span>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <i class="el-icon-position"></i>
                            <span slot="title">寄书订单</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <i class="el-icon-document-add"></i>
                            <span slot="title">添加图书信息</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
        </el-col>
        <el-row class="content">
            <el-col :span="18" :push="6" class="orderform" v-show="showContent == 1">
                <getbookorderform></getbookorderform>
            </el-col>
            <el-col :span="18" :push="6" class="orderform" v-show="showContent == 3">
                <addbookinfo></addbookinfo>
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
import menubar from '../../components/common/menu.vue'
import getbookorderform from '../../components/common/getbookOrderForm'
import addbookinfo from  '../../components/common/addBookInfo'

export default {
    name: "",
    components: {
        menubar,
        getbookorderform,
        addbookinfo
    },
    data(){
        return{
            showContent: 1,
        }
    },
    methods:{
        handleSelect(key) {
            this.showContent = key
        },
    }
}
</script>

<style scoped>
.header{
    position: fixed;
    z-index: 10;
    background: #fff;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    text-align: center;
}
.divider{
    margin: auto 8px;
    height: 80%;
}
.item {
    float: right;
    margin: auto 0;
}
.sideBar{
    z-index: 10;
    position: fixed;
    top: 60px;
    padding: 0;
}
.sideBar ul{
    height: calc(100vh - 60px);
}
.content{
    height: calc(100vh - 60px);
    max-width: 100vw;
    z-index: 1;
    top: 60px;
}
.orderform{
    height: 100%;
}
</style>
