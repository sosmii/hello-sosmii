<template>
  <div class="modal-content-wrapper">
    <header class="complete-modal__header">お問い合わせありがとうございました！</header>
    <div class="complete-modal__body">
      <div class="complete-icon">
        <i class="far fa-check-circle"/>
      </div>
      <p class="complete-message">
        コンタクトリクエストは受付済みです。<br>
        メールアドレスが有効かどうかを確認するため、初回のみ<b>確認メール</b>をお送りしています。<br>
        <br>
        メールが届かない場合は、<span 
          class="link" 
          @click="showAddress = true">こちら</span>に連絡をお願いいたします。
      </p>
      <div 
        :class="{visible: showAddress}" 
        class="address">sosmii.seekajob+support@gmail.com</div>
      <p class="complete-message">
        相思相愛となった場合は、後ほど日程調整用のメールをお送りします。<br>
        お会い出来る日を楽しみにしております😊
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompleteContact',
  data () {
    return {
      showAddress: false
    }
  }
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
