import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import globalData from './libs/globalData.js'
import Vuex from 'vuex'
import store from './store/store'
import VueCookies from 'vue-cookies'    //引入VueCookies
import axios from  'axios'
import qs from 'qs'
Vue.use(Vuex)
Vue.use(VueCookies)    // 声明使用
// Vue.use(VueResource)
Vue.use(ElementUI)
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = 'http://172.16.164.90:8000'
axios.interceptors.request.use((config) => {
    // 每次发请求检查浏览器是否带有cookie
    let token = VueCookies.get("sessionid")
    // if(config.method  === 'post'){
    //     config.data = qs.stringify(config.data);
    // }
    if (token) config.headers.Authorization = token;
    return config;
},(error) =>{
    return Promise.reject(error);
});
// TODO 实现登陆拦截
axios.defaults.withCredentials = true
Vue.config.productionTip = false
Vue.prototype.Global = globalData
Vue.prototype.$http = axios
Vue.prototype.$qs = qs
router.beforeEach((to,from,next)=>{
    if(to.meta.requireAuth===true){
        if(store.state.sessionid){
            next()
        }else{
            next({
                path:'/',
                query:{
                    redirect:to.fullPath
                }
            })
        }
    }
    else{
        next()
    }
})
new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store
}).$mount('#app')
