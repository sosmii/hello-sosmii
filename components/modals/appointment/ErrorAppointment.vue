<template>
  <div class="modal-content-wrapper">
    <header class="error-modal__header">Something Went Wrong ... ?</header>
    <div class="error-modal__body">
      <div class="error-icon">
        <i class="far fa-times-circle"/>
      </div>
      <p class="error-message">
        登録に失敗したかもしれません。<br>
        <br>
        登録日が被ってしまった可能性がありますので、再度予約をお試し下さい。
      </p>
      <button 
        class="button" 
        @click="retry()">
        <i class="fas fa-arrow-left button__icon"/>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorAppointment',
  methods: {
    retry () {
      this.$emit('retry')
    }
  }
}
</script>

<style scoped>
.error-modal__header {
  flex: 0;
  flex-basis: 8vh;
  background-color: #3E5A72;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
.error-modal__body {
  flex: 1;
  padding: 10px 20px;
}
.error-icon {
  font-size: 5em;
  color: red;
  padding-top: 20px;
}
.error-message {
  text-align: left;
  margin-top: 2em;
}
.error-message:first-child {
  margin-top: 30px;
}
.button {
  width: 50px;
  height: 50px;
  border-radius: 27px;
  margin: 30px auto 0 auto;
  background-color: #3E5A72;
  border: 2px solid #3E5A72;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color .3s ease, opacity .5s ease,
  border-color .3s ease, opacity .5s ease;
}
.button__icon {
  color: white;
  font-size: 1.5em;
  transition: color .3s ease;
}
.button:hover {
  background: white;
}
.button:hover > .button__icon {
  color: #3E5A72;
}
.button:focus {
  outline: 0;
}
</style>
