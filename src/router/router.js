import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/pages/login'
import mainPage from '../components/pages/mainPage'
import getBook from '../components/pages/getBook'
import publish from '../components/pages/publish'
import manager from  '../components/pages/managerMainPage'
import getBookRes from'../components/pages/getBookRes'
import sent from  '../components/pages/sent'
import softwarepart from '../components/pages/softwarepart'
import changePassword from '../components/pages/changePassword'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: login,
        },
        {
            path: '/sent',
            name: 'sent',
            component: sent,
            mata:{
                requireAuth:true
            }
        },
        {
            path: '/changePassword',
            name: 'changePassword',
            component: changePassword,
        },
        {
            path: '/softwarepart',
            name: 'softwarepart',
            component: softwarepart,
            mata:{
                requireAuth:true
            }
        },
        {
            path: '/mainPage',
            name: 'mainPage',
            component: mainPage
        },
        {
            path: '/getBook',
            name: 'getBook',
            component: getBook,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/publish',
            name: 'publish',
            component: publish,
            meta: {
                requireAuth: true
            }
        },
        {
            path:'/manager',
            name:'manager',
            component: manager,
            mata:{
                requireAuth:true
            }
        },
        {
            path:'/getBook/getBookRes',
            name:'getBookRes',
            component:getBookRes,
            mata:{
                requireAuth:true
            }
        }

    ]
})
