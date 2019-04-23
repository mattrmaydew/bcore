import Vue from 'vue'
import Vuex from 'vuex'
import firebase from './firebase'

Vue.use(Vuex)
Vue.use(firebase)

export const store = new Vuex.Store({
    state:{
        
    },
    mutations:{
        toggle(state, bool){
            state._isTrue = bool
        }
    },
    actions:{
        toggle(context){
            firebase.database.ref("Users/user").set(temp)
        },
        getFirebaseDatabase(context){
            firebase.database.ref("Users/user").on("value", function(snapshot){
                context.commit('toggle', snapshot.val())
            })
        }
    }
})
