import Vue from 'vue'
import * as _ from 'lodash'
import axios from 'axios'
const queryString = require('query-string')

import i18n from '@/i18n'
import config from '@/config'

const state = {
  users: [],
  currentPage: 1,
  userDetail: {},
  isFiltered: false,
  pageCount: null,
  filters: {
    nat: null,
    gender: null,
    results: config.results,
    page: 1
  }
}

const getters = {
  users() {
    return state.users
  },
  resultCount() {
    return state.resultCount
  },
  isFiltered() {
    return state.isFiltered
  },
  userDetail() {
    return state.userDetail
  },
  filters() {
    return state.filters
  },
  getPageCount() {
    return state.pageCount
  }
}

const actions = {
  // pass user detials to modal
  setUserDetail({ commit }, payload) {
    commit('setUserDetail', payload)
  },
  // for clear users from state
  clearUsers({ commit }) {
    commit('clearUsers')
  },
  // save filters on state
  setFilters({ commit }, payload) {
    commit('setFilters', payload)
  },
  // async method for retrives random users from api using axios
  async getRandomUsers({ commit, dispatch }, payload) {
    dispatch('startWorking', i18n.t('loading.get_users'))

    var params = queryString.stringify(payload)

    let {data} = await axios.get(`${config.api}?${params}`)
    commit('setUsers', {
      users: _.values(data.results),
      resultCount: data.info.results,
      currentPage: data.info.page
    })

    dispatch('stopWorking', i18n.t('loading.get_users'))
  },
  // once typing name filter results data matching this name
  filterUsersByName({ commit }, name) {
    const data = _.filter(state.users, _.method('name.first.match', new RegExp(name, 'i')) ||
                                      _.method('name.last.match', new RegExp(name, 'i')));

    commit('setUsers', {
      users: data,
      resultCount: _.size(data),
      currentPage: 1
    })
  },
  // reset users for given from localStorage
  resetUsers({ commit }) {
    commit('resetUsers')
  },
  isFiltered({ commit }, filtered) {
    commit('isFiltered', filtered)
  },
  // update page count on paginate
  setPageCount({ commit }, count) {
    commit('setPageCount', count)
  }
}

const mutations = {
  clearUsers(state) {
    state.users = []
    state.resultCount = 0
    state.currentPage = 1
    state.filters = {
      nat: '',
      gender: '',
      results: config.results,
      page: 1
    }
    Vue.localStorage.remove('randomUsers')
  },
  setUsers(state, payload) {
    state.users = payload.users
    state.resultCount = payload.resultCount
    state.currentPage = payload.currentPage
    Vue.localStorage.set('randomUsers', payload.users)
  },
  resetUsers(state) {
    state.users = Vue.localStorage.get('randomUsers', [])
    state.resultCount = _.size(state.users)
    state.currentPage = 1
  },
  setUserDetail(state, payload) {
    state.userDetail = payload
  },
  setFilters(state, payload) {
    state.filters = payload
  },
  isFiltered(state, filtered) {
    state.isFiltered = filtered
  },
  setPageCount(state, count) {
    state.pageCount = count
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
