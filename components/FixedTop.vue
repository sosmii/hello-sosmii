<template>
  <div 
    id="top" 
    class="top-container">
    <div class="portrait-area">
      <div class="portrait-area__msg">
        <div class="typewriter-effect">
          Hello, I'm <span 
            class="link" 
            @click="openLinkModal()">sosmii</span> !
        </div>
      </div>
      <div class="portrait-area__portrait">
        <img src="@/assets/portrait.svg">
      </div>
    </div>
    <div class="button-wrapper">
      <nuxt-link 
        :selected="paginationState.isInAboutMePage" 
        to="/aboutMe" 
        class="button button--personal">
        <div class="button__icon">
          <i class="fas fa-user"/>
        </div>
        <div class="button__text">私について</div>
      </nuxt-link>
      <nuxt-link 
        :selected="paginationState.isInQuittingPage" 
        to="/reason4Quitting" 
        class="button button--quitting">
        <div class="button__icon">
          <i class="fas fa-heart"/>
          <i class="fas fa-bolt overwriting-bolt"/>
        </div>
        <div class="button__text">転職の理由</div>
      </nuxt-link>
      <nuxt-link 
        :selected="paginationState.isInDesirePage" 
        to="/desire" 
        class="button button--desire">
        <div class="button__icon">
          <i class="fas fa-heart"/>
        </div>
        <div class="button__text">こんな風に働きたい</div>
      </nuxt-link>
    </div>
    <!-- <BaseModal v-if="linkModalState" @close="closeLinkModal()">
      <LinkModal/>
    </BaseModal> -->
  </div>
</template>

<script>
// import BaseModal from '@/components/modals/BaseModal'
// import LinkModal from '@/components/modals/LinkModal'

export default {
  name: 'FixedTop',
  // components: {
  //   BaseModal,
  //   LinkModal
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
      linkModalState: false
    }
  },
  methods: {
    openLinkModal () {
      this.linkModalState = true
    },
    closeLinkModal () {
      this.linkModalState = false
    }
  }
}
</script>

<style scoped>
@keyframes step {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
@keyframes blink-caret {
  from, to {
    border-color: transparent;
  }
  50% {
    border-color: #2c3e50;
  }
}
@keyframes delay-appear {
  from, 99% {
    visibility: hidden;
  }
}
  .top-container {
    height: 100vh;
    background-color: #F8F8F8;
  }
  .portrait-area {
    height: calc(60% + 8vh);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  }
  .portrait-area__msg {
    position: relative;
    padding: 20px;
    background-color: #c8c8c8;
    width: 200px;
    border-radius: 10px;
    font-size: 1.3em;
    cursor: default;
  }
  .portrait-area__msg::before{
    content: '';
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    left: 0;
    right: 0;
    bottom: -15px;
    margin: 0 auto;
    border-top: 15px solid #c8c8c8;
    border-right: 15px solid transparent;
    border-left: 15px solid transparent;
  }
  .typewriter-effect {
    overflow: hidden;
    border-right: .07em solid transparent;
    white-space: nowrap;
    margin: 0 auto;
    animation:
      step 1.5s steps(30, end) 1s,
      blink-caret .75s step-end 3 1s,
      delay-appear 1s;
  }
  .portrait-area__portrait {
    margin-top: 15px;
    margin-bottom: calc(100% / 20);
  }
  .button-wrapper {
    height: calc(40% - 8vh);
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
  }
  .button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    color: inherit;
    text-decoration: inherit;
    cursor: pointer;
    width: 100%;
    height: 100%;
    max-width: 30vmin;
    max-height: 30vmin;
    margin-bottom: 10px;
    border-radius: 30px;
    background-color: #FFFFFF;
    box-shadow: 0 2px 43px -4px rgba(0,0,0,.19);
    margin-bottom: 4vh;
    transition: background-color .3s;
  }
  .button--personal:hover,
  .button--personal[selected] {
    background-color: rgba(var(--color-yellow), .2);
  }
  .button--quitting:hover,
  .button--quitting[selected] {
    background-color: rgba(var(--color-blue), .2);
  }
  .button--desire:hover,
  .button--desire[selected] {
    background-color: rgba(var(--color-red), .2);
  }
  .button__icon {
    position: relative;
    height: 100px;
  }
  .button__icon > * {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 20px;
    margin: auto;
    font-size: 4rem;
  }
  .overwriting-bolt {
    color: white;
    font-size:4rem;
    transform:scale(0.5,1);
    transition: color .3s;
  }
  .button--quitting:hover .overwriting-bolt,
  .button--quitting[selected] .overwriting-bolt {
    color: #C6DDEC;
  }
</style>
