export default {
  namespaced: true,
  state: {
    isInAboutMePage: false,
    isInQuittingPage: false,
    isInDesirePage: false
  },
  mutations: {
    setIsInAboutMePage (state, val) {
      state.isInAboutMePage = val
    },
    setIsInQuittingPage (state, val) {
      state.isInQuittingPage = val
    },
    setIsInDesirePage (state, val) {
      state.isInDesirePage = val
    }
  }
}