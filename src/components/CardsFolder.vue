<template>
  <div class="cardsFolder">
    <h1 id="page-title">{{ pageTitle }}</h1>
    <div
      class="card"
      v-for="card in cards"
      :key="card.displayOrder"
    >
      <div class="card__title">{{ card.title }}</div>
      <div class="card__body" v-html="card.body"></div>
      <div class="card__expand-fake-button"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardsFolder',
  data () {
    return {
      pageTitle: 'aaa',
      cards: [{
        title: 'bbb',
        body: '<span style="color:red">ccc</span>',
        displayOrder: 1
      }]
    }
  }
}
</script>

<style scoped>
.cardsFolder {
  min-height: 92vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transition: background-color .5s ease;
}
.background-yellow {
  background-color: rgba(var(--color-yellow), .2);
}
.background-blue {
  background-color: rgba(var(--color-blue), .2);
}
.background-red {
  background-color: rgba(var(--color-red), .2);
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
