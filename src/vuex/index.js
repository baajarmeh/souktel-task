import Vue from 'vue'
import Vuex from 'vuex'

import util from './modules/util'
import users from './modules/users'
import alert from './modules/alert'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    util,
    alert,
    users
  }
})

export default store
