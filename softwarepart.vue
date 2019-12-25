<template>
   <div id="container">
        <ul>
            <li class="displayLi" :key="item.id" v-for="(item,index) in bookIdList" @click.stop= "showDetail(index)">
                <div class="left">
                    <div><span>书名：</span><span>《{{item.bookname}}》</span></div>
                    <div><span>作者：</span><span>{{item.writer}}</span></div>
                    <div><span>出版社：</span><span>{{item.press}}</span></div>
                    <div><span>书评：</span><span>{{item.message}}</span></div>
                    <div><span>发布时间：</span><span>{{item.uploaddatetime}}</span></div>
                    <div><span>图书状态：</span><span>{{item.state}}</span></div>
                    <!-- <div><span>捐赠对象：</span><span>{{item.donateTo}}</span></div> -->
                </div> 
                <div class="right">
                    <img :src="item.photourls">
                </div>
            </li>
        </ul>
        <menubar></menubar>
<bookDetailPage :bookId = "bookDetail.bookId" :collect="bookDetail.collect" :isDonated="bookDetail.isdonated" :ispicked="bookDetail.ispicked" :bookImg="bookDetail.photourls" :showDialog="showDialog" :bookIntro="bookDetail.description"  :bookName="bookDetail.bookname" v-on:close="closeDialog"></bookDetailPage>
</div>
</template>
<script>

//请注意这个是收藏页面

import menubar from '../../components/common/menu.vue'
import bookDetailPage from '../../components/common/book-detail-page.vue'
export default{
    name:"softwarepart",
    components:{
        menubar,
        bookDetailPage,
    },
    data() {
        return {
            bookIdList:[],
            showDialog: false,
            bookDetail:{
                bookname: "",
                writer: "",
                press: "",
                description: "",
                photourls: "",
                ispicked: false,
                isdonated: false,
                donateTo: 1,
                collect: true,
                uploaddatetime: "",
                bookId:1
            }
        }
    },
    methods:{
        showDetail:function(index)
        {
             //bookname: "",
               // writer: "",
                //press: "",
               // description: "",
              //  photourls: "",
               // ispicked: false,
               // isdonated: false,
              //  donateTo: 1,
              //  collect: false,
               // uploaddatetime: "",
               window.console.log("INDEX:",index)
               this.bookDetail.bookname = this.bookIdList[index].bookname;
               this.bookDetail.press = this.bookIdList[index].press
               this.bookDetail.description = this.bookIdList[index].description
               this.bookDetail.photourls  = this.bookIdList[index].photourls
               this.bookDetail.collect = true
               this.bookDetail.uploaddatetime = this.bookIdList[index].uploaddatetime
               this.showDialog = true;
        },
        closeDialog: function (show) {
            this.showDialog = show
        }
    },
    mounted()
    {
        const that = this
            this.$http.post('/getStarInfos/').then(res=>{
                if (res.data.msg === 'success') {
                    localStorage.setItem('user_bottle', JSON.stringify(res.data.bottles))
                    // 1：未入库 2：已入库 3：已拒收 4：已捐赠
                let arr = res.data.bottles;
                let len = arr.length
                for(let i =0; i<len;i++)
                {
                    switch(arr[i].state)
                    {
                        case 1:arr[i].state = "未入库";break
                        case 2:arr[i].state = "已入库";break
                        case 3:arr[i].state = "已拒收";break
                        case 4:arr[i].state = "已捐赠";break
                    }
                    if(arr[i].belong == 0)
                      that.bookIdList.push(arr[i]);
                }
                    window.console.log("BOOKIDLIST:",that.bookIdList);
                }else{
                    that.$message.error(res.data.msg)
                }
            })  
        }
}

</script>
<style scoped>
       #container {
                width: 100vw;
                height: 100vh;
                overflow: hidden;
                position:absolute;
            /* border: 1px solid aqua; */
            margin: 0 auto;
        }
        
        #container ul {
            list-style: none;
            padding: 0;
             margin-left:10%;
            width:80%;
            position:absolute;
        }
        
        .displayLi {
            width: 100%;
            height: 25%;
            max-height: 250px;
            border: 1px solid aqua;
            display: flex;
        }
        
        .left {
            width: 77%;
            height: 98%;
            overflow: hidden;
            margin-left: 2%;
            margin-top: 1%;
            margin-bottom: 1%;
        }
        
        .left div:nth-child(2) {
            overflow: hidden;
        }
        
        .right {
            width: 19%;
            margin-top: 1%;
            margin-right: 2%;
            margin-bottom: 1%;
            display: flex;
        }
        
        .right img {
            width: 100%;
            height: 100%;
            max-height: 120px;
            margin: auto;
        }
        
        span {
            font-size: 1em;
            font-weight: 800;
            color: rgb(49, 197, 185);
        }
    </style>