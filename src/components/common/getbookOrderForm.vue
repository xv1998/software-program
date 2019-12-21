<template>
    <div class="container">
        <el-table
                ref="filterTable"
                :data="tables"
                height="450"
                @cell-click="changeTag"
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="日期"
                    sortable
                    width="120"
                    column-key="date"
                    :filters="dateFilter"
                    :filter-method="dateFilterHandler"
            >
            </el-table-column>
            <el-table-column
                    prop="oid"
                    label="订单号"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="trackingnumber"
                    label="快递单号"
                    width="350"
                    :formatter="formatter">
            </el-table-column>
            <el-table-column
                    prop="company"
                    label="快递公司"
                    width="120"
                    :formatter="formatter2">
            </el-table-column>
            <el-table-column
                    prop="tag"
                    label="状态"
                    width="100"
                    :filters="[{ text: '接受', value: 'accepted' }, { text: '拒绝', value: 'refuse' },{ text: '待处理', value: 'pending' }]"
                    :filter-method="filterTag"
                    filter-placement="bottom-end">
                <template slot-scope="scope">
                    <div v-if="scope.row.tag === 'accepted'">
                        <el-tag type='success' disable-transitions>{{scope.row.tag}}</el-tag>
                    </div>
                    <div v-else-if="scope.row.tag === 'pending'">
                        <el-tag disable-transitions>{{scope.row.tag}}</el-tag>
                    </div>
                    <div v-else>
                        <el-tag type='danger' disable-transitions>{{scope.row.tag}}</el-tag>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-input v-model="searchContent" style="width: 350px;margin-right: 20px;" size="medium"
                  placeholder="输入关键字搜索"></el-input>
        <el-button class="btn" @click="resetDateFilter">清除日期过滤器</el-button>
        <el-button @click="clearFilter">清除所有过滤器</el-button>
        <!---------------------------------更改状态弹框-------------------------------------->
        <el-dialog title="提示" :visible.sync="statedialogFormVisible" width="350px" :modal="false">
            <el-form>
                <el-form-item label="状态更改">
                    <el-select v-model="state" placeholder="请选择状态">
                        <el-option label="接受" value="accepted"></el-option>
                        <el-option label="拒绝" value="refuse"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="statedialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmState">确 定</el-button>
            </div>
        </el-dialog>
        <!---------------------------------收货弹框-------------------------------------->
        <el-dialog title="订单信息" :visible.sync="deliverydialogFormVisible" :modal="false">
            <el-form :model="deliveryForm">
                <el-form-item label="快递单号" :label-width="formLabelWidth">
                    <el-input v-model="deliveryForm.oid" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="快递公司" :label-width="formLabelWidth">
                    <el-select v-model="deliveryForm.business" placeholder="请选择快递公司">
                        <el-option label="顺丰" value="1"></el-option>
                        <el-option label="中通" value="-1"></el-option>
                        <el-option label="圆通" value="0"></el-option>
                        <el-option label="百世" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="deliverydialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmDelivery">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "getbookorderform",
    props: {
        orderList: {
            type: Array,
            // default: () =>[]
        },
        tag: {
            type: Number, // 1是寄过来的订单，2是寄出去的订单
            default: 1,
        }
    },
    data() {
        return {
            statedialogFormVisible: false,
            deliverydialogFormVisible: false,
            deliveryForm: {
                oid: '',
                business: '',
            },
            formLabelWidth: '120px',
            searchContent: '',
            dateFilter: [],
            inSearch: false,
            searchData: [],
            state: '', // 临时状态存储
            selectedRow: '', // 被选中的瓶子
            tableData: [{
                date: '2019-05-02',
                oid: '12',
                trackingnumber: '12345',
                company: '中通',
                tag: 'pending'
            }, {
                date: '2019-12-04',
                oid: '1',
                trackingnumber: 'asd3423sfdf234',
                company: '圆通',
                tag: 'accepted'
            }, {
                date: '2019-11-01',
                oid: '3',
                trackingnumber: 'get23423dfs12312',
                company: '顺丰',
                tag: 'refuse'
            }, {
                date: '2019-10-03',
                oid: '7',
                trackingnumber: 'asdq4sdg45645h',
                company: '百世',
                tag: 'accepted'
            }, {
                date: '2019-12-04',
                oid: '11',
                trackingnumber: 'asd3423sfdf234',
                company: '圆通',
                tag: 'accepted'
            }, {
                date: '2019-12-04',
                oid: '22',
                trackingnumber: 'asd3423sfdf234',
                company: '圆通',
                tag: 'accepted'
            }, {
                date: '2019-12-04',
                oid: '33',
                trackingnumber: 'asd3423sfdf234',
                company: '圆通',
                tag: 'accepted'
            }, {
                date: '2019-12-04',
                oid: '44',
                trackingnumber: 'asd3423sfdf234',
                company: '圆通',
                tag: 'accepted'
            },]
        }
    },
    created() {
        const that = this
        if (that.orderList.length !== 0) {
            // window.console.log(that.orderList)
            that.orderList.forEach(item => {
                if (that.tag === 1) {
                    // 处理订单状态
                    if (item.state === 0) {
                        item.tag = 'pending'
                    } else {
                        item.tag = 'accepted'
                    }
                } else {
                    // 处理订单状态
                    if (item.otype === -1)
                        item.tag = 'refuse'
                    if (item.state === 1)
                        item.tag = 'accepted'
                    else {
                        item.tag = 'pending'
                    }
                }
                // 时间格式化
                if (item.submittime && item.completetime)
                    item.date = item.completetime.substr(0, 10)
                else item.date = item.submittime.substr(0, 10)
            })
        }
        that.tableData = that.orderList
    },
    mounted() {
        this.$watch('orderList', res => {
            window.console.log(res)
            const that = this
            if (res.length !== 0) {
                res.forEach(item => {
                    if (that.tag === 1) {
                        // 处理订单状态
                        if (item.state === 0) {
                            item.tag = 'pending'
                        } else {
                            item.tag = 'accepted'
                        }
                    } else {
                        // 处理订单状态
                        if (item.state === 1 && item.otype === -1)
                            item.tag = 'refuse'
                        else if (item.state === 1)
                            item.tag = 'accepted'
                        else {
                            item.tag = 'pending'
                        }
                    }
                    // 时间格式化
                    if (item.submittime && item.completetime)
                        item.date = item.completetime.substr(0, 10)
                    else item.date = item.submittime.substr(0, 10)
                })
            }
            that.tableData = res
        })
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        for (let i = 0; i < 5; i++) {
            let month1 = month - i
            if (month1 >= 1 && month1 <= 9) {
                month1 = "0" + month1
            }
            let currentdate = `${ year }-${ month1 }`
            let item = {
                'text': currentdate.toString(),
                'value': currentdate.toString()
            }
            this.dateFilter.push(item)
        }
    },
    computed: {
        tables: function () {
            let search = this.searchContent
            if (search) {
                return this.tableData.filter(function (dataNews) {
                    return Object.keys(dataNews).some(function (key) {
                        return String(dataNews[key]).indexOf(search) > -1
                    })
                })
            }
            return this.tableData
        },
    },
    methods: {
        resetDateFilter() {
            this.$refs.filterTable.clearFilter('date')
        },
        clearFilter() {
            this.$refs.filterTable.clearFilter()
        },
        formatter(row) {
            return row.trackingnumber
        },
        formatter2(row) {
            // 快递公司
            let name
            switch (row.expresscompany) {
                case -1 : {
                    name = '顺丰'
                    break
                }
                case 0: {
                    name = '圆通'
                    break
                }
                case 1: {
                    name = '中通'
                    break
                }
                case 2: {
                    name = '百世'
                    break
                }
                case 3: {
                    name = '天天'
                    break
                }
            }
            return name
        },
        filterTag(value, row) {
            return row.tag === value
        },
        dateFilterHandler(value, row, column) {
            const property = column['property']
            return row[property].substr(0, 7) === value
        },
        filterHandler(value, row, column) {
            const property = column['property']
            return row[property] === value
        },
        changeTag: function (row, column) {
            const that = this
            if (column.label === '状态') {
                switch (this.tag) {
                    case 1:
                        that.statedialogFormVisible = true
                        break
                    case 2:
                        that.deliverydialogFormVisible = true
                        break
                }
                this.selectedRow = row
            }
        },
        confirmState: function () {
            const that = this
            if (this.state) {
                const url = this.state === 'accepted' ? '/acceptOrder/' : '/rejectOrder/'
                this.tableData.forEach(item =>{
                    if (item.oid === that.selectedRow.oid){
                        item.tag = that.state
                    }
                })
                this.$http.post(url, {
                    oid: that.selectedRow.oid
                }).then(res => {
                    if (res.data.msg === 'success') {
                        that.$message.success('更新状态成功')
                    } else {
                        that.$message.error(res.data.msg)
                    }
                }).catch(e => {
                    that.$message.error(e)
                })
                that.statedialogFormVisible = false
        } else {
            this.$message.error('请选择状态')
        }
    },
    confirmDelivery: function () {
        const that = this
        this.$http.post('/completeOrder/', {
            oid: that.selectedRow.oid,
            expresscompany: that.deliveryForm.business,
            trackingnumber: that.deliveryForm.oid
        }).then(res => {
            if (res.data.msg === 'success') {
                that.tableData.forEach(item => {
                    if (item.oid === that.selectedRow.oid)
                        item.tag = 'accepted'
                    if (item.trackingnumber === that.selectedRow.trackingnumber)
                        item.trackingnumber = that.deliveryForm.oid
                    if (item.business === that.selectedRow.business)
                        item.business = that.deliveryForm.business
                })
                that.$message.success('更改成功')
            } else {
                that.$message.error(res.date.msg)
            }
            that.deliverydialogFormVisible = false
        })
    }
    // searchTable(){
    //     const that = this
    //     if (this.searchContent !== "") {
    //         this.inSearch = true
    //         this.searchData = this.tableData.filter(data => data.trackingnumber.indexOf(that.searchContent))
    //         return
    //     }
    //     this.inSearch = false
    //     this.searchData = []
    // }
}
}
</script>

<style scoped>
.container {
    z-index: 10;
    width: 100%;
    height: 100%;
    margin: auto;
}

.btn {
    margin-top: 15px;
}
</style>
