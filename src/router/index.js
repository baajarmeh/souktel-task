import Vue from 'vue'
import Router from 'vue-router'
import CardListing from '@/views/CardListing'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'employeer',
      component: CardListing
    }
  ]
})
