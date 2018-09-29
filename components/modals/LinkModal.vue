<template>
  <div class="link-modal">
    <a 
      class="link-icon" 
      href="https://github.com/sosmii" 
      target="_blank"><img src="~/assets/GitHub-Mark-64px.png"></a>
    <a 
      class="link-icon" 
      href="https://qiita.com/sosumii" 
      target="_blank"><img src="~/assets/qiita.png"></a>
    <a 
      class="link-icon" 
      href="https://twitter.com/sosmii1" 
      target="_blank"><img src="~/assets/Twitter_Social_Icon_Rounded_Square_Color.png"></a>
  </div>
</template>

<script>
export default {
  name: 'LinkModal',
};
</script>

<style scoped>
.link-modal {
  background-color: #f8f8f8;
  width: 300px;
  height: 200px;
  max-width: 80vmin;
  max-height: 80vmin;
  display: flex;
  justify-content: center;
  align-items: center;
}
.link-icon {
  margin: 0 10px;
}
</style>
