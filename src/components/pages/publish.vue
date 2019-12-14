<template>
    <div id="publish" class="publish-container">
        <menubar class="menu"></menubar>
        <div class="work-inner">
            <div class="work-container">
                <div class="title">
                    <h1>add</h1>
                </div>

                <el-form :model="addMess" :rules="rules" :label-position="top">
                    <div class="content-container" v-if="upper">
                        <div class="left">
                            <el-form-item label="书名" prop="name">
                                <el-input v-model="addMess.name" type="text" placeholder="bookname"
                                          size="large"></el-input>
                            </el-form-item>
                            <el-form-item label="作者" prop="author">
                                <el-input v-model="addMess.author" type="text" placeholder="author"
                                          size="large"></el-input>
                            </el-form-item>
                            <el-form-item label="出版社" prop="publisher">
                                <el-input v-model="addMess.publisher" type="text" placeholder="publisher"
                                          size="large"></el-input>
                            </el-form-item>
                            <div class="button1 button yellow" v-on:click="next">next</div>
                        </div>
                        <div class="comment">
                            <el-form-item label="书评" required>
                                <el-input v-model="addMess.comment" type="textarea" rows="15" cols="10"
                                          placeholder="write down your thoughts"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="pic-container" v-else>
                        <div class="left down">
                            <div class="button2 button" v-on:click="back">BACK</div>
                            <el-form-item label="捐赠对象" prop="picker" style="margin-top:45px">
                                <el-cascader v-model="addMess.donateTo" :options="options"
                                             :show-all-levels="false"></el-cascader>
                            </el-form-item>
                        </div>
                        <div class="right">
                            <el-form-item label="图片上传" required class="picture-box">
                                <el-upload
                                        action="#"
                                        ref="upload"
                                        list-type="picture-card"
                                        :auto-upload="false"
                                        :limit="1"
                                        :on-change='changeUpload'
                                        :on-preview="handlePictureCardPreview"
                                        :on-remove="handleRemove">
                                    <i slot="default" class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="addMess.pictureUrl" alt="">
                                </el-dialog>
                            </el-form-item>
                            <el-form-item>
                                <el-button class=" button yellow" style="width:100px;margin-top:30px; float:right" @click="submit(addMess)">发布</el-button>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import menubar from '../../components/common/menu.vue'

export default {
    name: "publish",
    components: {
        menubar,
    },
    data() {
        return {
            param:'',//表单要提交的参数
            top: 'top',
            upper: true,
            dialogVisible: false,
            disabled: false,
            addMess: {
                name: '',
                author: '',
                publisher: '',
                comment: '',
                pictureUrl: '',
                donateTo: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入书名', trigger: 'blur' },
                ],
                author: [
                    { required: true, message: '请输入作者', trigger: 'blur' },
                ],
                publisher: [
                    { required: true, message: '请输入出版社', trigger: 'blur' }
                ],
                picker: [
                    { required: true, message: '请至少选择一个', trigger: 'blur' }
                ]
            },
            options: [{
                value: '1',
                label: '不捐赠',
            }, {
                value: 'donate',
                label: '捐赠',
                children: [{
                    value: '0',
                    label: '个人'
                }, {
                    value: 'group',
                    label: '慈善机构',
                    children: [{
                        value: '2',
                        label: '汕头阳光福利院'
                    }, {
                        value: '3',
                        label: '广州星星福利院'
                    }]
                }]
            }]
        }
    },
    methods: {
        next: function () {
            this.upper = false
        },
        back: function () {
            this.upper = true
        },
        handleRemove() {
        },
        handlePictureCardPreview(file) {
            this.addMess.pictureUrl = file.url
            this.dialogVisible = true
        },
        changeUpload: function(file){
            this.addMess.pictureUrl = file.url
        },
        submit(formName) {
            const that = this
            function _isNumber(number) {
                let re = /^[0-9]+.?[0-9]*/
                return re.test(number)
            }
            if (formName){
                if (formName.donateTo.length !== 1){
                    window.console.log(formName.donateTo)
                    formName.donateTo.forEach(item =>{
                        if (_isNumber(item))
                            formName.donateTo = parseInt(item)
                    })
                }
                this.param = new FormData();
                this.param.append('bookname', formName.name)
                this.param.append('writer', formName.author)
                this.param.append('press', formName.publisher)
                this.param.append('timeouthandle', 'true')
                this.param.append('sendto', formName.donateTo)
                window.console.log(this.param)
                this.$http.post('/addBottle/',that.param).then(res =>{
                    window.console.log(res)
                })
            }else {
                that.$message.error('请填写资料完整')
            }
            // this.$refs[formName].validate((valid) => {
            //     if (valid) {
            //         alert('submit!')
            //     } else {
            //         return false
            //     }
            // this.$refs.upload.submit()
            // this.$refs.upload.clearFiles()
        }
    }
}
</script>

<style scoped>
.publish-container {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(64, 125, 164);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
}

.work-inner {
    width: 800px;
    height: 450px;
    background: rgba(26, 26, 26, 0.9);
    margin: 0 auto;
    position: relative;
}

.work-container {
    height: 100%;
    position: relative;
    z-index: 1;
}

.content-container {
    position: relative;
    display: flex;
    width: 800px;
    height: 100%;
    font-family: STKaiti;
    background: rgba(255, 255, 255, 1.0);
    transform-origin: 0 100%;
    transition: opacity .4s ease-in-out;
}

.title {
    top: -94px;
    background: transparent;
    position: absolute;
}

.title h1 {
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 3.4em;
    color: #fff;
}

.left {
    width: 50%;
    padding: 30px 40px;
    font-weight: bold;
}

.left .ant-input-lg {
    height: 42px;
}

.down {

}

.left .ant-input {
    font-size: 15px;
}

.button {
    text-decoration: none;
    text-transform: uppercase;
    display: inline-block;
    text-shadow: -2px 2px 0 rgba(0, 0, 0, 0.2);
    font-weight: bold;
    margin: 10px;
    transition: all 0.1s linear;
    transform: translateZ(0);
}

.button1 {
    color: white;
    padding: 10px 50px 20px 30px;
}

.button2 {
    color: #000;
    padding: 10px 30px 20px 50px;
}

.yellow {
    background: linear-gradient(to bottom, #f2d851, #ecc92b);
    color: black;
    text-shadow: -2px 2px 0 rgba(255, 255, 255, 0.3);
    box-shadow: -1px 0px 1px #d9b826, 0px 1px 1px #b1961d, -2px 1px 1px #d9b826, -1px 2px 1px #b1961d, -3px 2px 1px #d9b826, -2px 3px 1px #b1961d, -4px 3px 1px #d9b826, -3px 4px 1px #b1961d, -5px 4px 1px #d9b826, -4px 5px 1px #b1961d, -6px 5px 1px #d9b826, -6px 7px 0 rgba(0, 0, 0, 0.05), -5px 8px 0 rgba(0, 0, 0, 0.05), -3px 9px 0 rgba(0, 0, 0, 0.04), -2px 10px 0 rgba(0, 0, 0, 0.04), -1px 11px 0 rgba(0, 0, 0, 0.03), 0px 12px 0 rgba(0, 0, 0, 0.03), 1px 13px 0 rgba(0, 0, 0, 0.02), 2px 14px 0 rgba(0, 0, 0, 0.02), 3px 15px 0 rgba(0, 0, 0, 0.01), 4px 16px 0 rgba(0, 0, 0, 0.01), 5px 17px 0 rgba(0, 0, 0, 0.01), 6px 18px 0 rgba(0, 0, 0, 0.01), inset 0 4px 5px -2px rgba(255, 255, 255, 0.5), inset 0 1px 0 0 rgba(0, 0, 0, 0.3);
}

.yellow:after,
.yellow:before {
    background: black;
}

.yellow:after {
    filter: drop-shadow(-2px 0 0 rgba(255, 255, 255, 0.4));
}

.yellow:before {
    filter: drop-shadow(0 -2px 0 rgba(255, 255, 255, 0.35));
}

.yellow {
    filter: drop-shadow(-2px 0 0 rgba(255, 255, 255, 0.4));
}

.button:active {
    box-shadow: none;
    transform: translate3d(-6px, 6px, 0);
}

.button:after {
    filter: drop-shadow(-2px 0 0 rgba(0, 0, 0, 0.2));
}

.button1:after,
.button1:before {
    position: absolute;
    content: " ";
    right: 15px;
    top: 8px;
    width: 6px;
    height: 18px;
    background: white;
    transform: rotate(-45deg);
    display: block;
    z-index: 2;
}

.button1:before {
    height: 14px;
    top: 20px;
    right: 16px;
    z-index: 3;
    transform: rotate(-137deg);
    filter: drop-shadow(0 -2px 0 rgba(0, 0, 0, 0.15));
}

.button2:after,
.button2:before {
    position: absolute;
    content: " ";
    left: 15px;
    bottom: 14px;
    width: 6px;
    height: 18px;
    background: #111111;
    transform: rotate(-45deg);
    display: block;
    z-index: 2;
}

.button2:before {
    height: 14px;
    bottom: 25px;
    left: 15px;
    z-index: 3;
    transform: rotate(-137deg);
}

.comment {
    font-weight: bold;
    padding: 30px;
    width: 300px;
    position: relative;
}

.right {
    font-weight: bold;
    margin: 20px 0;
    padding: 30px;
    width: 50%;
}

.comment .ant-input {
    height: 300px;
}

.comment .el-form-item {
    margin-bottom: 0;
    position: relative;
}

.pic-container {
    position: relative;
    display: flex;
    width: 800px;
    height: 450px;
    font-family: STKaiti;
    background: rgba(255, 255, 255, 1.0);
    transform-origin: 0 100%;
    transition: opacity .4s ease-in-out;
}

.picture-box {
    margin-bottom: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    width: 360px;
    height: 250px;
    padding: 15px;
}

</style>
