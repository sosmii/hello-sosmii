<template>
  <div class="folder-container folder-container--red">
    <cardsFolder :json-data="json.desire"/>
  </div>
</template>

<script>
import cardsFolder from '~/components/CardsFolder';
import { mapGetters } from 'vuex';

export default {
  components: {
    cardsFolder,
  },
  computed: {
    ...mapGetters('jsonData', ['json']),
  },
};
</script>

<style scoped>
.folder-container {
  min-height: 100vh;
  transition: background-color 0.5s ease;
}
.folder-container--red {
  background-color: rgba(var(--color-red), 0.2);
}
</style>
