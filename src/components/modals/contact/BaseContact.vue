<template>
  <div class="base-contact-modal">
    <LoginContact v-if="step === 'login'"/>
  </div>
</template>

<script>
import LoginContact from '@/components/modals/contact/LoginContact'

export default {
  name: 'BaseContact',
  components: {
    LoginContact
  },
  data () {
    return {
      step: 'login'
    }
  }
}
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
