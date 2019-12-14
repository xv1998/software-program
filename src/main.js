import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import vueBeauty from 'vue-beauty'
import 'vue-beauty/package/style/vue-beauty.min.css'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
/*import store from './store/store'*/

Vue.use(VueResource)
Vue.use(vueBeauty)
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
    el: '#app',
    render: h => h(App),
    router
}).$mount('#app')
