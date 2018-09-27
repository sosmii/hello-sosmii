export default {
  namespaced: true,
  state: {
    personal: {
      pageTitle: null,
      cardsData: [{
        title: null,
        body: null,
        expand: null,
        displayOrder: null
      }]
    },
    quitting: {
      pageTitle: null,
      cardsData: [{
        title: null,
        body: null,
        expand: null,
        displayOrder: null
      }]
    },
    desire: {
      pageTitle: null,
      cardsData: [{
        title: null,
        body: null,
        expand: null,
        displayOrder: null
      }]
    }
  },
  mutations: {
    setPersonal (state, val) {
      state.personal = val
    },
    setQuitting (state, val) {
      state.quitting = val
    },
    setDesire (state, val) {
      state.desire = val
    }
  }
}