<template>
  <div class="modal-content-wrapper">
    <header class="complete-modal__header">面談が確定しました！</header>
    <div class="complete-modal__body">
      <div class="complete-icon">
        <font-awesome-icon :icon="['far', 'check-circle']"/>
      </div>
      <p class="complete-message">
        拙作にお付き合いいただき、ありがとうございました。<br>
        お会いできる日を楽しみにしております。<br>
        <br>
        <br>
        手動にて確認メールを送信致しますので、後ほどご確認お願いします。<br>
        Skypeを選択された場合はSkype IDを、その他を選択された場合は場所などの最終確認が記載されています。
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompleteAppointment'
}
</script>

<style scoped>
.complete-modal__header {
  flex: 0;
  flex-basis: 8vh;
  background-color: #3E5A72;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
.complete-modal__body {
  flex: 1;
  padding: 10px 20px;
}
.complete-icon {
  font-size: 5em;
  color: #00FF00;
  padding-top: 20px;
}
.complete-message {
  text-align: left;
  margin-top: 2em;
}
.complete-message:first-child {
  margin-top: 30px;
}
.address {
  opacity: 0;
  visibility: hidden;
  transition: opacity .2s linear;
}
.address.visible {
  opacity: 1;
  visibility: visible;
}
</style>
