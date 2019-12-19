import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'    //引入VueCookies
Vue.use(Vuex)
const store=new Vuex.Store({
    state:{
        sessionid:VueCookies.get("sessionid")
    },
    mutations:{
        saveSession:function(state,data){
            let that = this
           state.sessionid=data.sessionid
            console.log(store.state)
        //   VueCookies.set("sessionid",data.sessionid)
        }
    }

})
export default store
