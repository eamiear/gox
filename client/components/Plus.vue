<template>
    <div class="add-button" @click="handleClick" :style="{display: show ? 'inline-block' : 'none'}">
      <mu-float-button icon="add" mini class="demo-float-button"/>
    </div>
</template>
<style>
   .add-button{
     position: absolute;
     right: 1em;
     top: 1em;
   }
   .mu-float-button-wrapper{
     cursor: pointer;
   }
</style>
<script>
  export default{
    props: {
      show: false
    },
    data(){
      return{}
    },
    methods:{
      handleClick (e) {
        this.$emit('click', e)
      }
    }
  }
</script>
