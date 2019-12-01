import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/pages/login'
import mainPage from '../components/pages/mainPage'
import getBook from '../components/pages/getBook'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: login
        },
        {
            path: '/mainPage',
            name: 'mainPage',
            component: mainPage
        },
        {
            path:'/getBook',
            name:'getBook',
            component:getBook
        }
    ]
})
