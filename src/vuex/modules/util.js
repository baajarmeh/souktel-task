import Vue from 'vue'
import * as _ from 'lodash'

const state = {
  activeWork: []
}

const getters = {
  working() {
    return state.activeWork.length > 0 ? state.activeWork[0] : null
  }
}

const actions = {
  startWorking({ commit }, payload) {
    commit({
      type: 'startWorking',
      message: payload
    })
  },
  stopWorking({ commit }, payload) {
    commit({
      type: 'stopWorking',
      message: payload
    })
  }
}

const mutations = {
  startWorking(state, payload) {
    const message = _.isString(payload.message) && !_.isEmpty(payload.message) ? payload.message : 'Doing something...'

    state.activeWork.push(message)
    state.activeWork = _.uniq(state.activeWork)
  },
  stopWorking(state, payload) {
    const message = _.isString(payload.message) && !_.isEmpty(payload.message) ? payload.message : 'Doing something...'

    state.activeWork = _.uniq(state.activeWork).filter((w) => !_.isEqual(w, message))
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
