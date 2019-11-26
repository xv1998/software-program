<template>
    <div id="mainPage">
        <button @click="showDetail">show</button>
        <bookDetailPage :bookId=1  :showDialog="showDialog" v-on:close="closeDialog"></bookDetailPage>
    </div>
</template>

<script>
import bookDetailPage from '../../components/common/book-detail-page.vue'
export default {
    name: "mainPage",
    components:{
        bookDetailPage
    },
    data(){
      return {
        showDialog: false
      }
    },
    methods: {
      showDetail:function() {
        this.showDialog = true
      },
      closeDialog:function (show) {
        this.showDialog = show
      }
    }
}
</script>

<style scoped>

</style>
