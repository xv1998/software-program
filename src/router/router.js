import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/pages/login'
import mainPage from '../components/pages/mainPage'
import publish from  '../components/pages/publish'
import manager from  '../components/pages/managerMainPage'

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
            path: '/publish',
            name: 'publish',
            component: publish
        },
        {
            path:'/manager',
            name:'manager',
            component: manager
        }
    ]
})
