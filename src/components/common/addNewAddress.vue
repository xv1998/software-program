<template>
    <section>
        <div class="NewAddress-Container" v-if="showModel">
            <div class="fullbg"></div>
            <div class="NewAddress-content">
                <img src="../../assets/close.png" @click="close()">
                <div class="form">
                    <el-form :model="form" ref="form" :rules="rules">
                        <el-form-item label="所在地区" prop="address">
                            <VDistpicker :province="form.province" :city="form.city" :area="form.district"
                                         @selected="onSelected" v-model="form.address"></VDistpicker>
                        </el-form-item>
                        <el-form-item label="收件人" prop="name">
                            <el-input style="margin-left:14px;width:200px;" v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="详细地址" prop="specific">
                            <el-input v-model="form.specific"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码" prop="phonenumber">
                            <el-input v-model="form.phonenumber"></el-input>
                        </el-form-item>
                        <el-form-item label="电话号码" style="margin-left:10px;" prop="tel">
                            <el-input v-model="form.tel"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱地址" style="margin-left:10px;" prop="email">
                            <el-input v-model="form.email"></el-input>
                            <div class="email-tips">用来接收订单提醒邮件，便于您及时了解订单状态</div>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" @click="submit(form)">保存收件人信息</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import VDistpicker from 'v-distpicker'

    export default {
        name: "addNewAddress",
        props: {
            showModel: {
                Type: Boolean,
                default: false
            },
            form: {
                Type: Object,
            }
        },
        data() {
            let checkPhone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('手机号码不能为空'))
                } else {
                    if (value.length !== 11) {
                        return callback(new Error('请输入正确格式'))
                    }
                    else {
                        let reg = new RegExp("^[1]+[0-9]{10}$")
                        if (!reg.test(value)) {
                            return callback(new Error('请输入数字值'))
                        } else {
                            callback();
                        }
                    }
                }
            }
            let checkTel = (rule, value, callback) => {
                setTimeout(() => {
                    console.log(value)
                    console.log(!Number.isInteger(value))
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'))
                    } else {
                        callback();
                    }
                }, 1000)
            }
            let checkEmail = (rule, value, callback) => {
                if (value) {
                    let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                    if (!reg.test(value)) {
                        return callback(new Error('请输入正确的邮箱格式'))
                    }
                } else {
                    callback()
                }

            }
            let checkAddress = (rule, value, callback) => {
                console.log(value)
                if(value.province&&value.city&&value.district){
                    callback()
                }else{
                    return callback(new Error('请选择地区'))
                }
            }
            return {
                rules: {
                    address: [
                        { required: true, message: '请选择地区', trigger: 'blur', validator: checkAddress }],
                    name: [
                        { required: true, message: '请输入收件人', trigger: 'blur' }],
                    phonenumber: [
                        { required: true, trigger: 'blur', validator: checkPhone }],
                    specific: [
                        { required: true, message: '请输入详细地址', trigger: 'blur' }],
                    Tel: [{
                        validator: checkTel
                    }],
                    email: [
                        { validator: checkEmail }
                    ]
                }
            }
        },
        components: {
            VDistpicker
        },
        methods: {
            close: function () {
                this.$emit('close', this.form.index)
            },
            onSelected: function (data) {
                let address = {
                    'province': data.province.value,
                    'city': data.city.value,
                    'district': data.area.value,
                }
                this.form.address = address
                this.address = address
            },
            submit: function (form) {
                console.log(form)
                this.$refs.form.validate((vaild => {
                        if (vaild) {
                            this.$emit('address', form)
                        } else {
                            // TODO 添加失败弹框
                        }
                    }
                ))
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
        height: 100vh;
        z-index: 1;
        filter: alpha(opacity=50);
    }

    img {
        width: 16px;
        height: 16px;
        position: absolute;
        right: 10px;
    }

    .NewAddress-content {
        padding: .1em .2em;
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
        border: 0.01em solid rgba(191, 191, 191, 0.6);
        border-radius: 5px;
        display: flex;
        flex-direction: column;
    }

    .address-picker {
        display: flex;
        flex-direction: column;
    }

    .distpicker-address-wrapper {
        display: flex;
        padding: .1em;
    }

    .email-tips {
        font-size: .8em;
        color: #778899;
    }

    .el-input {
        width: 400px;
    }

    .choice {
        display: flex;
        flex-direction: column;
    }

    .form {
        margin: .4em 0 0 .2em;
    }

    .el-form-item__label {
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
