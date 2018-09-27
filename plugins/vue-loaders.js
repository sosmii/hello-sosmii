import Vue from 'vue'
import 'vue-loaders/dist/vue-loaders.css'
import { LineSpinFadeLoader, install } from 'vue-loaders'

const VueLoaders = { LineSpinFadeLoader, install }
Vue.use(VueLoaders)