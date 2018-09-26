<template>
  <div class="folder-container folder-container--red">
    <cardsFolder :json-data="jsonData"/>
  </div>
</template>

<script>
import cardsFolder from '~/components/CardsFolder'
import desireJson from '~/assets/desire-public.json'

export default {
  components: {
    cardsFolder
  },
  data () {
    return {
      jsonData: desireJson
    }
  }
}
</script>

<style scoped>
.folder-container {
  min-height: 92vh;
  transition: background-color .5s ease;
}
.folder-container--red {
  background-color: rgba(var(--color-red), .2);
}
</style>
