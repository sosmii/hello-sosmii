export default function({ route, store }) {
  if (route.path === '/aboutMe') {
    store.commit('paginationState/setIsInAboutMePage', true);
    store.commit('paginationState/setIsInQuittingPage', false);
    store.commit('paginationState/setIsInDesirePage', false);
    return;
  }

  if (route.path === '/reason4Quitting') {
    store.commit('paginationState/setIsInAboutMePage', false);
    store.commit('paginationState/setIsInQuittingPage', true);
    store.commit('paginationState/setIsInDesirePage', false);
    return;
  }

  if (route.path === '/desire') {
    store.commit('paginationState/setIsInAboutMePage', false);
    store.commit('paginationState/setIsInQuittingPage', false);
    store.commit('paginationState/setIsInDesirePage', true);
    return;
  }

  store.commit('paginationState/setIsInAboutMePage', false);
  store.commit('paginationState/setIsInQuittingPage', false);
  store.commit('paginationState/setIsInDesirePage', false);
}
