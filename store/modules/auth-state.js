import { firestore } from '~/plugins/firebase-setting';
import { firebaseAction } from 'vuexfire';

export default {
  namespaced: true,
  state: {
    isUserLoggedIn: false,
    dbState: null,
  },
  getters: {
    isUserRegistered: state => {
      return state.dbState != null;
    },
    isUserAuthorized: state => {
      return state.dbState ? state.dbState.isAuthorized : false;
    },
    hasUserReserved: state => {
      return state.dbState ? state.dbState.isReserved : false;
    },
  },
  mutations: {
    setLoginState(state, val) {
      state.isUserLoggedIn = val;
    },
    setDbState(state, val) {
      state.dbState = val;
    },
  },
  actions: {
    BIND_USER_STATE: firebaseAction(
      async ({ bindFirebaseRef, getters, dispatch }, payload) => {
        await bindFirebaseRef(
          'dbState',
          firestore.collection('user').doc(payload.uid)
        );

        if (getters.isUserAuthorized) {
          dispatch('jsonData/fetchCardsDataFromRemote', null, { root: true });
        }
      }
    ),
    UNBIND_USER_STATE: firebaseAction(({ unbindFirebaseRef }) => {
      unbindFirebaseRef('dbState');
    }),
    resetAllState({ commit }) {
      commit(setDbState, null);
    },
  },
};
