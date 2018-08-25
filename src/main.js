// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { faUser, faHeart, faBolt, faBuilding, faUtensils, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faSkype } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'vue-loaders/dist/vue-loaders.css'
import { LineSpinFadeLoader, install } from 'vue-loaders'

Vue.config.productionTip = false

// setup font-awesome
library.add(faEnvelope, faCheckCircle, faTimesCircle, faUser, faHeart, faBolt, faSkype, faBuilding, faUtensils, faArrowLeft)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// setup vue-loaders
const VueLoaders = { LineSpinFadeLoader, install }
Vue.use(VueLoaders)

// setup Vuex
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    isUserLoggedIn: false,
    isUserRegistered: false
  },
  mutations: {
    updateLoginState (state, boolean) {
      state.isUserLoggedIn = boolean
    },
    updateRegisterState (state, boolean) {
      state.isUserRegistered = boolean
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
