import { fireAuth } from '~/plugins/firebase-setting';

export default ({ store }) => {
  fireAuth.onAuthStateChanged(async user => {
    if (!user) {
      store.commit('authState/setLoginState', false);
      store.commit('setGithubId', null);

      store.dispatch('authState/UNBIND_USER_STATE');
      store.dispatch('authState/resetAllState');
      return;
    }

    store.commit('authState/setLoginState', true);
    store.commit('setGithubId', user.providerData[0].uid);

    const uid = user.uid;
    store.dispatch('authState/BIND_USER_STATE', { uid: uid });
  });
};
