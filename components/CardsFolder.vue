<template>
  <div class="cards-folder">
    <h1 id="page-title">{{ pageTitle }}</h1>
    <Cards 
      v-for="card in cards" 
      :key="card.displayOrder" 
      :title="card.title" 
      :body="card.body" 
      :should-expand="card.expand"/>
    <BaseModal v-if="whileLoading"/>
  </div>
</template>

<script>
import BaseModal from '@/components/modals/BaseModal'
import Cards from '~/components/Cards'
import { setTimeout } from 'timers'

export default {
  components: {
    BaseModal,
    Cards
  },
  props: {
    jsonData: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  computed: {
    whileLoading () {
      return (!this.jsonData)
    },
    pageTitle () {
      if (!this.jsonData) {
        return null
      }

      return this.jsonData.pageTitle
    },
    cards () {
      if (!this.jsonData) {
        return null
      }

      return this.jsonData.cardsData
    }
  },
  mounted () {
    this.scrollToTitle()
  },
  methods: {
    scrollToTitle () {
      setTimeout(() => {
        const elem = document.getElementById('page-title')

        if (elem) {
          elem.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 500)
    }
  }
}
</script>

<style scoped>
.cards-folder {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
#page-title {
  width: 100%;
  padding-top: 10vh;
  margin-top: 0;
}
.cards-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
</style>
