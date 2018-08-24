import Vue from 'vue'
import Router from 'vue-router'
import DummyTop from '@/components/DummyTop'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DummyTop',
      component: DummyTop
    }
  ]
})
