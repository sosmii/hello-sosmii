import Vuex from 'vuex'
import jsonData from '~/store/modules/json-data'

export default () => new Vuex.Store({
  // TODO: モジュール分け
  state: {
    isUserLoggedIn: false,
    isUserRegistered: false,
    isUserAuthorized: false,
    hasUserReserved: false,
    githubId: null
  },
  mutations: {
    updateLoginState (state, boolean) {
      state.isUserLoggedIn = boolean
    },
    updateRegisterState (state, boolean) {
      state.isUserRegistered = boolean
    },
    updateAuthorizedState (state, boolean) {
      state.isUserAuthorized = boolean
    },
    updateReservationState (state, boolean) {
      state.hasUserReserved = boolean
    },
    setGithubId (state, id) {
      state.githubId = id
    }
  },
  modules: {
    jsonData
  }
})