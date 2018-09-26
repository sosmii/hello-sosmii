<template>
  <div class="folder-container folder-container--yellow">
    <cardsFolder :json-data="jsonData"/>
  </div>
</template>

<script>
import cardsFolder from '~/components/CardsFolder'
import personalJson from '~/assets/personal-public.json'

export default {
  components: {
    cardsFolder
  },
  data () {
    return {
      jsonData: personalJson
    }
  }
}
</script>

<style scoped>
.folder-container {
  min-height: 92vh;
  transition: background-color .5s ease;
}
.folder-container--yellow {
  background-color: rgba(var(--color-yellow), .2);
}
</style>
