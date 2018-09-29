export default {
  namespaced: true,
  state: {
    isUserLoggedIn: false,
    isUserRegistered: false,
    isUserAuthorized: false,
    hasUserReserved: false,
  },
  mutations: {
    updateLoginState(state, boolean) {
      state.isUserLoggedIn = boolean;
    },
    updateRegisterState(state, boolean) {
      state.isUserRegistered = boolean;
    },
    updateAuthorizedState(state, boolean) {
      state.isUserAuthorized = boolean;
    },
    updateReservationState(state, boolean) {
      state.hasUserReserved = boolean;
    },
  },
};
