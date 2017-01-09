<template>
  <nav class="">
    <router-link class="pull-left" :to="{ path: path}" title="返回">
      <span class="icon icon-reply"></span>
    </router-link>
    <slot></slot>
    <p class="title">{{title}}</p>
  </nav>
</template>

<script>
  export default {
    props: {
      title: '',
      path: '',
      icon:''
    }
  }
</script>

<style scoped>
nav{
  overflow: hidden;

  a{
    padding: 0 10px;

    &,
    & .icon{
      cursor: pointer !important;
      font-size: 20px;
      transition: all .45s cubic-bezier(.445,.05,.55,.95);
    }
    &:hover .icon{
      color: rgba(247, 67, 67, 0.65);
    }
  }
  .title{
    margin: 0;
    padding: 4px 0 0 0;
    text-align: center;
    font-size: 16px;
    color: rgba(37, 33, 33, 0.72);
    font-weight: 600;
  }
}
.icon-left,
.icon-reply{
  width: 2rem;
}
</style>
