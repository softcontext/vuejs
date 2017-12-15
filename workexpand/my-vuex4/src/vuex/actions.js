import {CHANGE_MSG, INCREMENT_COUNTER} from './mutation_types'

// export const changeMessage = (store, msg) => {
//   store.commit(CHANGE_MSG, msg)
// }
//
// export const incrementCounter = (store) => {
//   store.commit(INCREMENT_COUNTER)
// }

export default {
  changeMessage ({commit}, msg) {
    commit(CHANGE_MSG, msg)
  },
  incrementCounter ({commit}) {
    commit(INCREMENT_COUNTER)
  },
  // 하나의 액션에서 두개의 저장소 데이터를 조작하는 업무를 수행하는 경우도 있을 수 있다.
  handleMessageInputChanges({commit}, event){
    commit(CHANGE_MSG, event.target.value)
    if (event.keyCode === 13) {
      commit(INCREMENT_COUNTER)
    }
  }
}
