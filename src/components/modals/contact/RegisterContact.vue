<template>
  <div class="modal-content-wrapper">
    <header class="register-modal__header">貴社情報の入力</header>
    <div class="register-modal__body">
      <div class="row">
        <div class="row__text">担当者様名</div>
        <input v-model="pic" class="row__input" :class="{'validation-error': !pic}" placeholder="*必須">
      </div>
      <div class="row">
        <div class="row__text">貴社名</div>
        <input v-model="companyName" class="row__input" :class="{'validation-error': !companyName}" placeholder="*必須">
      </div>
      <div class="row">
        <div class="row__text">貴社ウェブサイト</div>
        <input v-model="companyHp" class="row__input" :class="{'validation-error': !companyHp}" placeholder="*必須">
      </div>
      <div class="row">
        <div class="row__text">メッセージ</div>
        <textarea v-model="message" class="row__input row__input--textarea" placeholder=
"特別に伝えたいことがある場合のみご記入下さい。
ほとんどの場合は空欄で結構です。"/>
      </div>
    </div>
    <footer class="register-modal__footer">
      <button class="button" @click="sendRegister(); showLoadingIcon()" v-if="!whileLoading">
        <font-awesome-icon :icon="['far', 'envelope']" class="button__icon"/>
      </button>
      <div class="loading-icon-wrapper" v-if="whileLoading">
        <LineSpinFadeLoader/>
      </div>
    </footer>
  </div>
</template>

<script>
/* global firebase:true */
import { mapState } from 'vuex'

export default {
  name: 'RegisterContact',
  data () {
    return {
      pic: null,
      companyName: null,
      companyHp: null,
      message: null,
      whileLoading: false
    }
  },
  computed: {
    ...mapState(['githubId'])
  },
  methods: {
    async sendRegister () {
      if (!this.pic || !this.companyName || !this.companyHp) {
        return
      }

      const registerFunc = firebase.functions().httpsCallable('register')
      await registerFunc({
        pic: this.pic,
        companyName: this.companyName,
        companyHp: this.companyHp,
        message: this.message,
        githubId: this.githubId
      })

      this.$store.commit('updateRegisterState', true)
    },
    showLoadingIcon () {
      this.whileLoading = true
    }
  }
}
</script>

<style scoped>
.register-modal__header {
  flex: 0;
  flex-basis: 8vh;
  background-color: #3E5A72;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
.register-modal__body {
  flex: 1;
  padding: 10px 20px;
}
.row {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}
.row:not(:first-child) {
  margin-top: 10px;
}
.row__text {
  text-align: left;
}
.row__input {
  border: solid 1px #dcdfe6;
  color: #606266;
  border-radius: 4px;
  outline: 0;
  height: 30px;
}
.row__input--textarea {
  height: 120px;
}
.validation-error:not(:focus) {
  border-color: red;
}
.register-modal__footer {
  flex: 0;
  flex-basis: 8vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button {
  width: 50px;
  height: 50px;
  border-radius: 27px;
  background-color: #3E5A72;
  border: 2px solid #3E5A72;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color .3s ease;
}
.button:focus {
    outline: 0;
}
.button:hover {
  background: white;
}
.button__icon {
  color: white;
  font-size: 1.5em;
  transition: color .3s ease;
}
.button:hover > .button__icon {
  color: #3E5A72;
}
.line-spin-fade-loader >>> * {
  background-color: #3E5A72;
}
</style>
