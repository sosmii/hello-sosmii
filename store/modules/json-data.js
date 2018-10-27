import { fireFunc } from '~/plugins/firebase-setting';

import personalPublic from '~/assets/jsons/personal-public.json';
import quittingPublic from '~/assets/jsons/quitting-public.json';
import desirePublic from '~/assets/jsons/desire-public.json';

export default {
  namespaced: true,
  state: {
    publicJson: {
      personal: personalPublic,
      quitting: quittingPublic,
      desire: desirePublic,
    },
    privateJson: null,
  },
  getters: {
    json: state => {
      return state.privateJson ? state.privateJson : state.publicJson;
    },
  },
  mutations: {
    setPrivateJson(state, val) {
      state.privateJson = val;
    },
  },
  actions: {
    async fetchCardsDataFromRemote({ state, commit }) {
      if (state.privateJson) return;

      const cardsData = await fetchCardsDataFromRemote();
      commit('setPrivateJson', cardsData);
    },
  },
};

const fetchCardsDataFromRemote = async () => {
  const fetchFunc = fireFunc.httpsCallable('fetchCardsData');

  return (await fetchFunc()).data;
};
