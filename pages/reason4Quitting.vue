<template>
  <div class="folder-container folder-container--blue">
    <cardsFolder :json-data="json.quitting"/>
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
.folder-container--blue {
  background-color: rgba(var(--color-blue), 0.2);
}
</style>
