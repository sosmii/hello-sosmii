<template>
  <header class="header">
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
.header {
  height: 8vh;
  width: 100%;
  background-color: #3E5A72;
  position: fixed;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
