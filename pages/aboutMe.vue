<template>
  <div class="folder-container folder-container--yellow">
    <cardsFolder :json-data="json.personal"/>
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
.folder-container--yellow {
  background-color: rgba(var(--color-yellow), 0.2);
}
</style>
