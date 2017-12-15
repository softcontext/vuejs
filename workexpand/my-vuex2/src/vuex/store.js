// Vuex 디펜던시 설치가 필요하다.
// npm i vuex

import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getter'

Vue.use(Vuex)

const state = {
  msg: 'Hello Vue!'
}

const mutations = {
  changeMessage(state, msg) {
    state.msg = msg
  }
}

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  getters
})
