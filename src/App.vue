<template>
  <div id="app">
    <Header/>
    <FixedTop/>
    <router-view/>
  </div>
</template>

<script>
import 'normalize.css'
import Header from '@/components/Header'
import FixedTop from '@/components/FixedTop'

export default {
  name: 'App',
  components: {
    Header,
    FixedTop
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
