<template>
  <div class="base-appointment-modal">
    <MakeAppointment v-if="step === 1" @done="step = 2" @error="step = 'error'"/>
    <CompleteAppointment v-if="step === 2"/>
    <ErrorAppointment v-if="step === 'error'" @retry="step = 1"/>
  </div>
</template>

<script>
import MakeAppointment from '@/components/modals/appointment/MakeAppointment'
import CompleteAppointment from '@/components/modals/appointment/CompleteAppointment'
import ErrorAppointment from '@/components/modals/appointment/ErrorAppointment'

export default {
  name: 'BaseAppointment',
  components: {
    MakeAppointment,
    CompleteAppointment,
    ErrorAppointment
  },
  data () {
    return {
      step: 1
    }
  }
}
</script>

<style scoped>
.base-appointment-modal {
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
