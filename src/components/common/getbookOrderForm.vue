<template>
    <div class="container">
        <el-table
                ref="filterTable"
                :data="tableData"
                height="450"
                @cell-click="changeTag"
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="日期"
                    sortable
                    width="180"
                    column-key="date"
                    :filters="dateFilter"
                    :filter-method="dateFilterHandler"
            >
            </el-table-column>
            <el-table-column
                    prop="id"
                    label="瓶子编号"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="orderId"
                    label="订单号"
                    width="400"
                    :formatter="formatter">
            </el-table-column>
            <el-table-column
                    prop="company"
                    label="快递公司"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="tag"
                    label="状态"
                    width="100"
                    :filters="[{ text: '接受', value: 'accepted' }, { text: '拒绝', value: 'refuse' },{ text: '运送中', value: 'transport' }]"
                    :filter-method="filterTag"
                    filter-placement="bottom-end">
                <template slot-scope="scope">
                    <div v-if="scope.row.tag === 'accepted'">
                        <el-tag type='success' disable-transitions>{{scope.row.tag}}</el-tag>
                    </div>
                    <div v-else-if="scope.row.tag === 'transport'">
                        <el-tag disable-transitions>{{scope.row.tag}}</el-tag>
                    </div>
                    <div v-else>
                        <el-tag type='danger' disable-transitions>{{scope.row.tag}}</el-tag>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-button class="btn" @click="resetDateFilter">清除日期过滤器</el-button>
        <el-button @click="clearFilter">清除所有过滤器</el-button>
        <!---------------------------------更改状态弹框-------------------------------------->
        <el-dialog title="提示" :visible.sync="dialogFormVisible" width="350px" :modal="false">
            <el-form>
                <el-form-item label="状态更改">
                    <el-select v-model="state" placeholder="请选择状态">
                        <el-option label="接受" value="accepted"></el-option>
                        <el-option label="拒绝" value="refuse"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmDelivery">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "getbookorderform",
    data(){
        return{
            dialogFormVisible: false,
            dateFilter:[],
            state:'', // 临时状态存储
            selectedRow:'', // 被选中的瓶子
            tableData: [{
                date: '2019-05-02',
                id: '12',
                orderId: '12345',
                company: '中通',
                tag: 'transport'
            }, {
                date: '2019-12-04',
                id: '1',
                orderId: 'asd3423sfdf234',
                company: '圆通',
                tag: 'accepted'
            }, {
                date: '2019-11-01',
                id: '3',
                orderId: 'get23423dfs12312',
                company: '顺丰',
                tag: 'refuse'
            }, {
                date: '2019-10-03',
                id: '7',
                orderId: 'asdq4sdg45645h',
                company: '百世',
                tag: 'accepted'
            },{
                date: '2019-12-04',
                id: '11',
                orderId: 'asd3423sfdf234',
                company: '圆通',
                tag: 'accepted'
            },{
                date: '2019-12-04',
                id: '22',
                orderId: 'asd3423sfdf234',
                company: '圆通',
                tag: 'accepted'
            },{
                date: '2019-12-04',
                id: '33',
                orderId: 'asd3423sfdf234',
                company: '圆通',
                tag: 'accepted'
            },{
                date: '2019-12-04',
                id: '44',
                orderId: 'asd3423sfdf234',
                company: '圆通',
                tag: 'accepted'
            },]
        }
    },
    created:function() {
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        for(let i = 0; i < 5; i++){
            let month1 = month - i
            if (month1 >= 1 && month1 <= 9) {
                month1 = "0" + month1
            }
            let currentdate = `${year}-${month1}`
            let item = {
                'text': currentdate.toString(),
                'value': currentdate.toString()
            }
            this.dateFilter.push(item)
        }
        window.console.log(this.dateFilter)
    },
    methods: {
        resetDateFilter() {
            this.$refs.filterTable.clearFilter('date');
        },
        clearFilter() {
            this.$refs.filterTable.clearFilter();
        },
        formatter(row) {
            return row.orderId;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        dateFilterHandler(value, row, column) {
            const property = column['property'];
            return row[property].substr(0, 7) === value;
        },
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
        changeTag:function (row, column) {
            if (column.label === '状态'){
                this.dialogFormVisible = true
                this.selectedRow = row
            }
        },
        confirmDelivery: function () {
            const that = this
            if (this.state) {
                // this.selectedRow
                this.tableData.forEach(item =>{
                    if (item.id === that.selectedRow.id){
                        item.tag = that.state
                    }
                })
                this.dialogFormVisible = false
            }else {
                this.$message.error('请选择状态')
            }
        }
    }
}
</script>

<style scoped>
.container{
    width: 100%;
    height: 100%;
    margin: auto;
}
.btn{
    margin-top: 15px;
}
</style>
