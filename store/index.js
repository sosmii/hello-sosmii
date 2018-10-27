import Vuex from 'vuex';
import { firebaseMutations } from 'vuexfire';
import authState from '~/store/modules/auth-state';
import jsonData from '~/store/modules/json-data';
import paginationState from '~/store/modules/pagination-state';

export default () =>
  new Vuex.Store({
    state: {
      githubId: null,
    },
    mutations: {
      setGithubId(state, id) {
        state.githubId = id;
      },
      ...firebaseMutations,
    },
    modules: {
      authState,
      jsonData,
      paginationState,
    },
  });
