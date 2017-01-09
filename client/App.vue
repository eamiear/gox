<template>
    <div class="container">
      <transition name="custom-classes-transition"
                  enter-active-class="animated fadeIn"
                  leave-active-class="animated fadeOut">
        <router-view></router-view>
      </transition>
    </div>
</template>

<script>
   // import VHeader from './components/Header.vue'
    import './assets/css/photon.css'
    import './assets/css/animate.css'
    import './assets/css/material-icons.css'
    export default {
        components: {
         // VHeader
        }
    }
</script>

<style>
  html,body,
  .container{
    height: 100%;
    font-family: "microsoft yahei";
  }
  .container {
    position: relative;
    margin: 0 auto;
    border: 2px solid #ece3e3;
    overflow: hidden;
  }
</style>
