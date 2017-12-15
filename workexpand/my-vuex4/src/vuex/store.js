import Vue from 'vue'
import Vuex from 'vuex'

import {INCREMENT_COUNTER,CHANGE_MSG} from './mutation_types'
import getters from './getter'
import actions from './actions'

Vue.use(Vuex)

const state = {
  message: 'Hello Vue!',
  counter: 0
}

const mutations = {
  [CHANGE_MSG](state, msg) {
    state.message = msg
  },
  [INCREMENT_COUNTER](state) {
    state.counter++
  }
}

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  getters,
  actions
})
