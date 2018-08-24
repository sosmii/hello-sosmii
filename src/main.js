// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { faUser, faHeart, faBolt, faBuilding, faUtensils, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faSkype } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false

// setup font-awesome
library.add(faEnvelope, faCheckCircle, faTimesCircle, faUser, faHeart, faBolt, faSkype, faBuilding, faUtensils, faArrowLeft)
Vue.component('font-awesome-icon', FontAwesomeIcon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
