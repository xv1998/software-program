<template>
    <section>
        <div class="NewAddress-Container" v-if="showModel">
            <div class="fullbg"></div>
            <div class="NewAddress-content">
                <img src="../../assets/close.png" @click="close()">
                <div class="form">
    <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="所在地区" prop="address"  required>
            <VDistpicker @selected="onSelected"></VDistpicker>
        </el-form-item>
        <el-form-item label="收件人" prop="consignee">
            <el-input style="margin-left:14px;width:200px;" v-model="form.consignee"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="detailAddress">
            <el-input v-model="form.address"></el-input></el-form-item>
        <el-form-item label="手机号码" prop="phone">
            <el-input v-model="form.phone"></el-input></el-form-item>
        <el-form-item label="电话号码" style="margin-left:10px;">
            <el-input v-model="form.tel"></el-input></el-form-item>
        <el-form-item label="邮箱地址" style="margin-left:10px;">
            <el-input v-model="form.email" prop="email"></el-input>
        </el-form-item>
        <el-form-item>
        <el-button type="danger" @click="submit()">保存收件人信息</el-button>
        </el-form-item>
    </el-form>
                </div></div>
        </div>
    </section>
</template>

<script>
    import VDistpicker from 'v-distpicker'

    export default {
        name: "addNewAddress",
        props:{
            showModel:{
                Type:Boolean,
                default:false
            }
        },
        data() {
            return {
                form:{
                        email: '',
                        consignee:'',
                        phone:'',
                        tel:''
                },
                rules:{
                    consignee: [
                        { required: true, message: '请输入收件人', trigger: 'blur' }],
                    phone: [
                        { required: true, message: '请输入联系人电话号码', trigger: 'blur' }],
                    address: [
                        { required: true, message: '请选择地区', trigger: 'blur' }],
                    detailAddress: [
                        { required: true, message: '请输入地址', trigger: 'blur' }],
                    email:[
                        {message:'用来接收订单提醒邮件，便于您及时了解订单状态'}
                    ]
                }
            }
        },
        watch:{
            'showDialog'(showModel) {
                this.showModel = showModel
            }
        },
        components: {
            VDistpicker
        },
        methods:{
            close:function(){
                this.showModel=false

                this.$emit('close',this.showModel)
            },
            onSelected:function(data){
                let address = {
                    'province':data.province.value,
                    'city':data.city.value,
                    'district':data.area.value,
                }
                this.address=address
            },
            submit:function(){
                let address = this.address
                address.name=form.consignee
                address.phonenumber=form.phone
                this.$emit('address',this.address)
            }
        }
    }
</script>

<style scoped>
    .fullbg {
        background-color: #6d6d66;
        left: 0;
        opacity: 0.5;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        filter: alpha(opacity=50);
    }
    img{
        width:16px;
        height:16px;
        position:absolute;
        right:10px;
    }
    .NewAddress-content{
        padding:.1em .2em;
        position: fixed;
        width: 600px;
        height: 500px;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        z-index: 2;
        background: white;
        border:0.01em solid rgba(191,191,191,0.6);
        border-radius:5px;
        display:flex;
        flex-direction: column;
    }
    .address-picker{
        display: flex;
        flex-direction: column;
    }
    .distpicker-address-wrapper{
        display: flex;
        padding:.1em;
    }
    .el-input{
        width:400px;

    }
    .choice{
        display: flex;
        flex-direction: column;
    }
    .form{
        margin:.4em 0 0 .2em;
    }
    .el-form-item__label{

    }

    @media screen and (min-width: 1921px) {

        .NewAddress-Container {
            font-size: 108px;
        }
    }

    @media screen and (max-width: 1920px) and (min-width: 1521px) {

        .NewAddress-Container {
            font-size: 100px;
        }

    }

    @media screen and (max-width: 1520px) and (min-width: 1281px) {
        body {
        }

        .NewAddress-Container {
            font-size: 80px;
        }
    }

    @media screen and (max-width: 1280px) and (min-width: 1024px) {
        body {
        }

        .NewAddress-Container {
            font-size: 66px;
        }
    }

    @media screen and (min-width: 1024px) {
        body {
        }
    }

    @media screen and (max-width: 1023px) {
        .NewAddress-Container {
            font-size: 66px;
        }
    }

    @media screen and (max-width: 1023px), screen and (max-height: 767px) {
        .NewAddress-Container {
            font-size: 66px;
        }
    }
</style>
