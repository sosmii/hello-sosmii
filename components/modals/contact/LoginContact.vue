<template>
  <div class="modal-content-wrapper">
    <header class="login-modal__header">GitHub認証による登録</header>
    <div class="login-modal__body">
      <div class="login-icon">
        <img 
          v-if="!whileLoading" 
          class="github-icon" 
          src="@/assets/GitHub-Mark-64px.png" 
          @click="githubSignIn(); showLoadingIcon()">
        <div 
          v-if="whileLoading" 
          class="loading-icon-wrapper">
          <LineSpinFadeLoader/>
        </div>
      </div>
      <div class="login-annotation">
        当プロジェクトでは以下の情報を取得します。
        <ul>
          <li style="margin-bottom: 0.5em;">GitHub UUID</li>
          <li style="margin-bottom: 1em;">GitHubに紐づくメールアドレス</li>
          Cloud Functionsを通じて確認・日程調整用メールを送信するために使用します。<br>
          取得したアドレスは、上記の目的以外には使用されませんが、<b>データベースに保存されます</b>ことを、お含みおき下さい。
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { fireAuth, githubAuthProvider } from '~/plugins/firebase-setting';

export default {
  name: 'LoginContact',
  data() {
    return {
      whileLoading: false,
    };
  },
  methods: {
    async githubSignIn() {
      await fireAuth.signInWithPopup(githubAuthProvider);
    },
    showLoadingIcon() {
      this.whileLoading = true;
    },
  },
};
</script>

<style scoped>
.login-modal__header {
  flex: 0;
  flex-basis: 8vh;
  background-color: #3e5a72;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
.login-modal__body {
  flex: 1;
  padding: 10px 20px;
}
.login-modal__footer {
  flex: 0;
  flex-basis: 8vh;
}
.login-icon {
  margin-top: 30px;
}
.github-icon {
  cursor: pointer;
}
.login-annotation {
  text-align: left;
  margin-top: 30px;
  line-height: 18px;
}
.line-spin-fade-loader >>> * {
  background-color: #3e5a72;
}
</style>
