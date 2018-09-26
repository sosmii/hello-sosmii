<template>
  <div class="folder-container folder-container--blue">
    <cardsFolder :json-data="jsonData"/>
  </div>
</template>

<script>
import cardsFolder from '~/components/CardsFolder'
import quittingJson from '~/assets/quitting-public.json'

export default {
  components: {
    cardsFolder
  },
  data () {
    return {
      jsonData: quittingJson
    }
  }
}
</script>

<style scoped>
.folder-container {
  min-height: 92vh;
  transition: background-color .5s ease;
}
.folder-container--blue {
  background-color: rgba(var(--color-blue), .2);
}
</style>
