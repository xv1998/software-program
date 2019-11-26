<template>
  <div id="app">
    <button @click="showDetail">show</button>
    <bookDetailPage class="book" :bookId=1  :showDialog="showDialog" v-on:close="closeDialog"></bookDetailPage>
  </div>
</template>

<script>
import bookDetailPage from './components/common/book-detail-page.vue'

export default {
  name: 'app',
  components: {
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.book{
  -webkit-transform: translateY(0);
  -moz-transform: translateY(0);
  -ms-transform: translateY(0);
  -o-transform: translateY(0);
  transform: translateY(0);
}
.book{
  animation:mymove 5s infinite;
}
@keyframes mymove {
  0% {
    transform: translateY(5px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(5px);
  }
}
</style>
