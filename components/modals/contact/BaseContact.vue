<template>
  <div class="base-contact-modal">
    <LoginContact v-if="step === 'login'"/>
    <RegisterContact v-if="step === 'register'"/>
    <CompleteContact v-if="step === 'complete'"/>
  </div>
</template>

<script>
import LoginContact from '@/components/modals/contact/LoginContact';
import RegisterContact from '@/components/modals/contact/RegisterContact';
import CompleteContact from '@/components/modals/contact/CompleteContact';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'BaseContact',
  components: {
    LoginContact,
    RegisterContact,
    CompleteContact,
  },
  computed: {
    ...mapState('authState', ['isUserLoggedIn']),
    ...mapGetters('authState', ['isUserRegistered']),
    step() {
      if (!this.isUserLoggedIn) {
        return 'login';
      }

      if (this.isUserLoggedIn && !this.isUserRegistered) {
        return 'register';
      }

      return 'complete';
    },
  },
};
</script>

<style scoped>
.base-contact-modal {
  width: 500px;
  height: 500px;
  max-width: 80vmin;
  max-height: 80vmin;
}
.modal-content-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
</style>
