export default {
  getMessage(state) {
    return state.message.toUpperCase()
  },
  getCounter(state) {
    return state.counter
  }
}
