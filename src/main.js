import Vue from 'vue'
import * as _ from 'lodash'
import App from './App'
import router from './router'
import store from './vuex'
import i18n from './i18n'
import config from './config'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSimpleSpinner from 'vue-simple-spinner'
import VuePaginate from 'vuejs-paginate'
import VueLocalStorage from 'vue-localstorage'
import LoadingOverlay from '@/components/LoadingOverlay'
import UserModal from '@/components/employeer/UserModal'

Vue.use(BootstrapVue)
Vue.use(VueLocalStorage)

Vue.component('spinner', VueSimpleSpinner)
Vue.component('loading-overlay', LoadingOverlay)
Vue.component('paginate', VuePaginate)
Vue.component('user-modal', UserModal)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store: store,
  i18n,
  router,
  template: '<App/>',
  components: { App }
})
