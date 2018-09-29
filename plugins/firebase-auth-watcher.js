import personalPublic from '~/assets/personal-public.json'
import quittingPublic from '~/assets/quitting-public.json'
import desirePublic from '~/assets/desire-public.json'
import { fireAuth, fireFunc } from '~/plugins/firebase-setting'

export default ({ store }, inject) => {
  fireAuth.onAuthStateChanged(async user => {
    if (!user) {
      store.commit('authState/updateLoginState', false)
      store.commit('authState/updateRegisterState', false)
      store.commit('authState/updateAuthorizedState', false)
      store.commit('authState/updateReservationState', false)

      updateCardsDataWithAssets(store)
      return
    }

    const userState = await getUserState()
    store.commit('authState/updateLoginState', true)
    store.commit('authState/updateRegisterState', userState.isRegistered)
    store.commit('authState/updateAuthorizedState', userState.isAuthorized)
    store.commit('authState/updateReservationState', userState.hasReserved)
    store.commit('setGithubId', user.providerData[0].uid)

    if (!userState.isAuthorized) {
      updateCardsDataWithAssets(store)
      return
    }

    updateCardsDataWithRemote(store)
  })
}

// TODO: firestoreと直接繋げる
// 今のままだとSPAなのにuserStateの更新にリロードが要る
const getUserState = async () => {
  const referFunc = fireFunc.httpsCallable('getUserState')

  return (await referFunc()).data
}

const updateCardsDataWithAssets = (store) => {
  store.commit('jsonData/setPersonal', personalPublic)
  store.commit('jsonData/setQuitting', quittingPublic)
  store.commit('jsonData/setDesire', desirePublic)
}

const updateCardsDataWithRemote = async (store) => {
  const cardsData = await getCardsDataFromRemote()

  store.commit('jsonData/setPersonal', cardsData.personal)
  store.commit('jsonData/setQuitting', cardsData.quitting)
  store.commit('jsonData/setDesire', cardsData.desire)
}

const getCardsDataFromRemote = async () => {
  const fetchFunc = fireFunc.httpsCallable('fetchCardsData')

  return  (await fetchFunc()).data
}