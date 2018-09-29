<template>
  <div class="folder-container folder-container--yellow">
    <cardsFolder :json-data="jsonData"/>
  </div>
</template>

<script>
import cardsFolder from '~/components/CardsFolder';
import { mapState } from 'vuex';

export default {
  components: {
    cardsFolder,
  },
  computed: {
    ...mapState('jsonData', {
      jsonData: 'personal',
    }),
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
