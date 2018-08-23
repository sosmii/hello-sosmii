import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { faUser, faHeart, faBolt, faBuilding, faUtensils, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faSkype } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { DatePicker, Input } from 'element-ui'
import lang from 'element-ui/lib/locale/lang/ja'
import locale from 'element-ui/lib/locale'
import 'vue-loaders/dist/vue-loaders.css'
import { LineSpinFadeLoader, install } from 'vue-loaders'

Vue.config.productionTip = false

// setup font-awesome
library.add(faEnvelope, faCheckCircle, faTimesCircle, faUser, faHeart, faBolt, faSkype, faBuilding, faUtensils, faArrowLeft)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// setup vue-loaders
const VueLoaders = { LineSpinFadeLoader, install }
Vue.use(VueLoaders)

// setup element-ui
locale.use(lang)
Vue.use(DatePicker)
Vue.use(Input)

// setup Vuex
Vue.use(Vuex)
const store = new Vuex.Store({
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
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
