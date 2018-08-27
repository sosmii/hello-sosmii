<template>
  <div id="app">
    <Header :paginationState="paginationState"/>
    <FixedTop :paginationState="paginationState"/>
    <router-view :paginationState="paginationState" :cardsFolder="cardsFolder"/>
  </div>
</template>

<script>
/* global firebase:true */
import 'normalize.css'
import Header from '@/components/Header'
import FixedTop from '@/components/FixedTop'
import * as personalJson from '@/assets/personal-public.json'
import * as quittingJson from '@/assets/quitting-public.json'
import * as desireJson from '@/assets/desire-public.json'

export default {
  name: 'App',
  components: {
    Header,
    FixedTop
  },
  data () {
    return {
      cardsFolder: null
    }
  },
  computed: {
    isInAboutMePage () { return (this.$route.name === 'AboutMe') },
    isInQuittingPage () { return (this.$route.name === 'Quitting') },
    isInDesirePage () { return (this.$route.name === 'Desire') },
    paginationState () {
      return {
        isInAboutMePage: this.isInAboutMePage,
        isInQuittingPage: this.isInQuittingPage,
        isInDesirePage: this.isInDesirePage
      }
    }
  },
  mounted () {
    this.cardsFolder = {
      personal: personalJson,
      quitting: quittingJson,
      desire: desireJson
    }

    firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        this.$store.commit('updateLoginState', false)
        this.$store.commit('updateRegisterState', false)

        return
      }

      this.$store.commit('updateLoginState', true)
      this.$store.commit('updateRegisterState', false)
      this.$store.commit('setGithubId', user.providerData[0].uid)
    })
  }
}
</script>

<style>
html, body, #app {
  height: 100%;
  --color-yellow: 254, 238, 157;
  --color-blue: 31, 118, 187;
  --color-red: 236, 61, 66;
}
@keyframes on-load-visible {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  animation: on-load-visible 1s ease;
}
.link {
  text-decoration: underline;
  color: purple;
  cursor: pointer;
}
/* @media screen and (min-width: 768px) {
} */
</style>
