<template>
  <div class="top-container" id="top">
    <div class="portrait-area">
      <div class="portrait-area__msg">
        <div class="typewriter-effect">
          Hello, I'm <span class="link">sosmii</span> !
        </div>
      </div>
      <div class="portrait-area__portrait">
        <img src="@/assets/portrait.svg">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FixedTop'
}
</script>

<style scoped>
/* @keyframes on-load-popup {
  from {
    opacity: 0;
    transform: translateY(40%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
} */
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
</style>
