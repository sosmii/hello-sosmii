import Vue from 'vue'
import Router from 'vue-router'
import DummyTop from '@/components/DummyTop'
import CardsFolder from '@/components/CardsFolder'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'DummyTop',
      component: DummyTop
    },
    {
      path: '/aboutMe',
      name: 'AboutMe',
      component: CardsFolder
    },
    {
      path: '/reason4Quitting',
      name: 'Quitting',
      component: CardsFolder
    },
    {
      path: '/desire',
      name: 'Desire',
      component: CardsFolder
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: DummyTop
    }
  ]
})
