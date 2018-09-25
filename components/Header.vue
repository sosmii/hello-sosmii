<template>
  <header class="header">
    <div class="center-area">
      <button 
        v-if="!isUserAuthorized" 
        class="button button--contact" 
        @click="openLoginModal()">
        <i class="far fa-envelope button__icon-with-text"/>
        Contact
      </button>
      <button 
        v-if="isUserAuthorized && !hasUserReserved" 
        class="button button--apo" 
        @click="openAppointmentModal()">
        <i class="far fa-envelope"/>
        面談を予約
      </button>
    </div>
    <div class="right-area">
      <router-link 
        :to="{ name: 'AboutMe' }" 
        :selected="paginationState.isInAboutMePage" 
        class="button button--personal">
        <i class="fas fa-user button__icon-with-text"/>
        <span class="button-text-shrinkable">私について</span>
      </router-link>
      <router-link 
        :to="{ name: 'Quitting' }" 
        :selected="paginationState.isInQuittingPage" 
        class="button button--quitting">
        <div class="button__icon-with-text icon-stack">
          <i class="fas fa-heart"/>
          <i class="fas fa-bolt overwriting-bolt"/>
        </div>
        <span class="button-text-shrinkable">転職の理由</span>
      </router-link>
      <router-link 
        :to="{ name: 'Desire' }" 
        :selected="paginationState.isInDesirePage" 
        class="button button--desire">
        <i class="fas fa-heart button__icon-with-text"/>
        <span class="button-text-shrinkable">こんな風に働きたい</span>
      </router-link>
    </div>
    <!-- TODO -->
    <!-- <BaseModal v-if="loginModalState" @close="closeContactModal()">
      <BaseContact/>
    </BaseModal>
    <BaseModal v-if="ApoModalState" @close="closeAppointmentModal()">
      <BaseAppointment/>
    </BaseModal> -->
  </header>
</template>

<script>
// import BaseModal from '@/components/modals/BaseModal'
// import BaseContact from '@/components/modals/contact/BaseContact'
// import BaseAppointment from '@/components/modals/appointment/BaseAppointment'
import { setTimeout } from 'timers'
import { mapState } from 'vuex'

export default {
  name: 'Header',
  // components: {
  //   BaseModal,
  //   BaseContact,
  //   BaseAppointment
  // },
  props: {
    // TODO: middleware + Vuexに変更
    paginationState: {
      type: Object,
      default: () => {
        return {
          isInAboutMePage: false,
          isInQuittingPage: false,
          isInDesirePage: false
        }
      }
    }
  },
  data () {
    return {
      loginModalState: false,
      ApoModalState: false
    }
  },
  computed: {
    ...mapState([
      'isUserAuthorized',
      'hasUserReserved'
    ])
  },
  computed: {
    isUserAuthorized: function () {
      return false
    },
    hasUserReserved: function () {
      return false
    }
  },
  methods: {
    openLoginModal () {
      if (this.$route.name === 'DummyTop') {
        this.loginModalState = true
        return
      }

      this.scrollToTop()
      setTimeout(() => {
        this.$router.push({ name: 'DummyTop' })
        this.loginModalState = true
      }, 500)
    },
    closeContactModal () {
      this.loginModalState = false
    },
    openAppointmentModal () {
      if (this.$route.name === 'DummyTop') {
        this.ApoModalState = true
        return
      }

      this.scrollToTop()
      setTimeout(() => {
        this.$router.push({ name: 'DummyTop' })
        this.ApoModalState = true
      }, 500)
    },
    closeAppointmentModal () {
      this.ApoModalState = false
    },
    scrollToTop () {
      const elem = document.getElementById('top')

      if (elem) {
        elem.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
  }
}
</script>

<style scoped>
  .header {
    height: 8vh;
    width: 100%;
    background-color: #3E5A72;
    position: fixed;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .center-area {
    grid-column: 2/3;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .right-area {
    grid-column: 3/4;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .right-area > * {
    margin-right: 20px;
  }
  .right-area > *:last-child {
    margin-right: 5px;
  }
  .button {
    height: 80%;
    background-color: transparent;
    color: white;
    border: 0;
    font-size: 1.2rem;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: color .3s;
  }
  .button--contact {
    width: 180px;
    border-radius: 100px;
    border: 1px solid white;
    transition: background-color .5s, color .5s;
  }
  .button--contact:hover {
    background-color: white;
    color: #3E5A72;
  }
  .button--contact:focus {
    outline: 0;
  }
  .button--apo {
    width: 180px;
    border-radius: 100px;
    border: 1px solid #00FF00;
    color: #00FF00;
    transition: background-color .5s, color .5s;
  }
  .button--apo:hover {
    background-color: #00FF00;
    color: white;
  }
  .button--apo:focus {
    outline: 0;
  }
  .button-text-shrinkable {
    font-size: 0.8rem;
  }
  .button__icon-with-text {
    margin-right: 7px;
  }
  .button--personal:hover,
  .button--personal[selected] {
    color: rgb(var(--color-yellow));
  }
  .button--quitting:hover,
  .button--quitting[selected] {
    color: #98cbfe;
  }
  .button--desire:hover,
  .button--desire[selected] {
    color: #fe9898;
  }
  .overwriting-bolt {
    color: #3E5A72;
    transform:scale(0.5,1);
    transition: color .3s;
  }
  .icon-stack {
    position: relative;
    width: 1em;
    height: 1em;
  }
  .icon-stack > * {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  @media screen and (max-width: 1093px) {
    .button-text-shrinkable {
      display: none;
    }
  }
</style>
