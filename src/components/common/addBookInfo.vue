<template>
    <div class="container">
        <el-form :model="bookForm" :rules="rules" ref="bookForm" label-width="100px" size="medium" class="demo-ruleForm">
            <el-form-item label="书名" prop="name" class="itemMargin">
                <el-input v-model="bookForm.name"></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="writer"  class="itemMargin">
                <el-input size="medium" v-model="bookForm.writer"></el-input>
            </el-form-item>
            <el-form-item label="出版社" prop="press"  class="itemMargin">
                <el-input size="small" v-model="bookForm.press"></el-input>
            </el-form-item>
            <el-form-item label="积分" prop="credit"  class="itemMargin">
                <el-input size="small" v-model="bookForm.credit"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="desc"  class="itemMargin">
                <el-input type="textarea" v-model="bookForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('bookForm')">立即创建</el-button>
                <el-button @click="resetForm('bookForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "addbookinfo",
    data() {
        return {
            bookForm: {
                name: '',
                writer:'',
                press: '',
                credit:'',
                desc: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入书名', trigger: 'blur' },
                ],
                writer: [
                    { required: true, message: '请输入作者', trigger: 'blur' },
                ],
                press: [
                    { required: true, message: '请输入出版社', trigger: 'blur' },
                ],
                credit: [
                    { required: true, message: '请输入积分', trigger: 'blur' },
                ],
                desc: [
                    { required: true, message: '请填写简介', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            const that = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    that.$http.post('/addBook/',{
                        bookname: that.bookForm.name,
                        writer: that.bookForm.writer,
                        press: that.bookForm.press,
                        neededcredit: that.bookForm.credit
                    }).then( res =>{
                        if (res.data.msg === 'success'){
                            that.$message.success('创建成功')
                        }else{
                            that.$message.error(res.data.msg)
                        }
                    }).catch()
                } else {
                    window.console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style scoped>
.container{
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: auto 0;
}
.demo-ruleForm{
    width: 80%;
}
.itemMargin{
    margin-bottom: 30px;
}
</style>
