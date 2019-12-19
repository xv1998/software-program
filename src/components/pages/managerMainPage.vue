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
        <el-main class="sideBar">
            <el-row >
                <el-col :span="4">
                    <el-menu
                            background-color="#545c64"
                            default-active="2"
                            class="el-menu-vertical-demo"
                            text-color="#fff"
                            active-text-color="#ffd04b"
                            @open="handleOpen"
                            @close="handleClose">
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
                        <el-menu-item index="3">
                            <i class="el-icon-position"></i>
                            <span slot="title">寄书订单</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <i class="el-icon-setting"></i>
                            <span slot="title">导航四</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
import menubar from '../../components/common/menu.vue'
export default {
    name: "",
    components: {
        menubar,
    },
    methods:{
        handleOpen(key, keyPath) {
            window.console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            window.console.log(key, keyPath);
        }
    }
}
</script>

<style scoped>
.header{
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
    height: 100%;
    padding: 0;
}
</style>
