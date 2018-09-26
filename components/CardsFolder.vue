<template>
  <div
    :class="[
      { 'background-yellow': paginationState.isInAboutMePage },
      { 'background-blue': paginationState.isInQuittingPage },
      { 'background-red': paginationState.isInDesirePage }
    ]"
    class="cards-folder"
  >
    <h1 id="page-title">{{ pageTitle }}</h1>
    <div
      v-for="(card, index) in cards"
      :class="{ 'expand': card.expand || -1 < expandTarget.indexOf(index) }"
      :key="card.displayOrder"
      class="card"
      @click="addToExpandTarget(index)"
    >
      <div class="card__title">{{ card.title }}</div>
      <div 
        class="card__body" 
        v-html="card.body"/>
      <div class="card__expand-fake-button"/>
    </div>
    <!-- <BaseModal v-if="whileLoading"/> -->
  </div>
</template>

<script>
// import BaseModal from '@/components/modals/BaseModal'
import { setTimeout } from 'timers'

export default {
  // components: {
  //   BaseModal
  // },
  props: {
    // TODO: middleware + Vuexに変更
    paginationState: {
      type: Object,
      default: () => {
        return {
          isInAboutMePage: false,
          isInQuittingPage: false,
          isInDesirePage: false
        }
      }
    },
    jsonData: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data () {
    return {
      expandTarget: []
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
    },
    addToExpandTarget (index) {
      if (this.expandTarget.indexOf(index) > -1) {
        return
      }

      this.expandTarget.push(index)
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
.card {
  width: 80vw;
  max-width: 700px;
  min-height: 100px;
  max-height: 200px;
  margin-bottom: 50px;
  background-color: #FFF;
  border-radius: 20px;
  overflow: hidden;
  transition: all .2s ease-out;
  box-shadow: 0 2px 43px -4px rgba(0,0,0,.19);
  text-align: left;
  cursor: pointer;
  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);
  position: relative;
}
.card:hover {
  box-shadow: 0 2px 5px rgba(0,0,0,.1), 0 1px 2px rgba(0,0,0,.05);
}
.card.expand {
  max-height: 9999px;
  transition: max-height 1s ease-in-out;
  cursor: default;
}
.card__title {
  font-size: 24px;
  font-weight: 700;
  padding: 15px 25px 7px 25px;
}
.card__body {
  border-top: 1px solid #C5CDD4;
  padding: 15px 25px 15px 25px;
  line-height: 1.5em;
}
.card__expand-fake-button {
  background: linear-gradient(to bottom, rgba(255,255,255,.5), rgba(255,255,255,1));
  position: absolute;
  width: 100%;
  height: 40px;
  bottom: 0;
}
.card__expand-fake-button::before {
  position: absolute;
  right: 20px;
  top: 0;
  margin: auto;
  content: '';
  border: 0;
  border-right: solid 2px #3E5A72;
  border-bottom: solid 2px #3E5A72;
  transform: rotate(45deg);
}
.card__expand-fake-button::before {
  width: 20px;
  height: 20px;
  bottom: 0;
}
.card.expand > .card__expand-fake-button {
  background: transparent;
  height: 0;
}
.card.expand > .card__expand-fake-button::before,
.card.expand > .card__expand-fake-button::after {
  border: 0;
}
.card__body >>> .mask {
  color: transparent;
  text-shadow: 0 0 13px rgba(0,0,0,0.5);
}
.card__body >>> .indent-1 {
  padding-left: 1em;
}
</style>
