<template>
  <div
    :class="{ 'expand': shouldExpand }"
    class="card"
    @click="shouldExpand = true"
  >
    <div class="card__title">{{ title }}</div>
    <div 
      class="card__body" 
      v-html="body"/>
    <div class="card__expand-fake-button"/>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => {
        return null;
      },
    },
    body: {
      type: String,
      default: () => {
        return null;
      },
    },
    shouldExpand: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
};
</script>


<style scoped>
.card {
  width: 80vw;
  max-width: 700px;
  min-height: 100px;
  max-height: 200px;
  margin-bottom: 50px;
  background-color: #fff;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.2s ease-out;
  box-shadow: 0 2px 43px -4px rgba(0, 0, 0, 0.19);
  text-align: left;
  cursor: pointer;
  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);
  position: relative;
}
.card:hover {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.05);
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
  border-top: 1px solid #c5cdd4;
  padding: 15px 25px 15px 25px;
  line-height: 1.5em;
}
.card__expand-fake-button {
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 1)
  );
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
  border-right: solid 2px #3e5a72;
  border-bottom: solid 2px #3e5a72;
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
  text-shadow: 0 0 13px rgba(0, 0, 0, 0.5);
}
.card__body >>> .indent-1 {
  padding-left: 1em;
}
</style>
