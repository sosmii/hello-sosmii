<template>
  <div id="layout">
    <Header/>
    <FixedTop/>
    <nuxt/>
  </div>
</template>

<script>
import Header from '~/components/Header'
import FixedTop from '~/components/FixedTop'

export default {
  components: {
    Header,
    FixedTop
  },
  middleware: ['pagination-state']
}
</script>

<style>
@keyframes on-load-visible {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
#layout {
  height: 100%;
  --color-yellow: 254, 238, 157;
  --color-blue: 31, 118, 187;
  --color-red: 236, 61, 66;
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
</style>
