<template>
  <div class="folder-container folder-container--red">
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
      jsonData: 'desire',
    }),
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
