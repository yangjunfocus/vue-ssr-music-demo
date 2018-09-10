<template>
<div id="app">
    
    <!-- <img class="logo" src="~public/logo-48.png" alt="logo">-->
    <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
    </transition>
</div>
</template>
<script>
  export default {
   
  }
</script>
<style lang="stylus">
*
  margin 0
  padding 0
  -webkit-box-sizing border-box
  box-sizing border-box
h2,h3
  font-weight normal
img 
  display block
  border none

a
  text-decoration none
  color #333
  -webkit-tap-highlight-color rgba(0,0,0,0)

i
  font-style normal

</style>
