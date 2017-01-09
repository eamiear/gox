<template>
  <header class="toolbar toolbar-header">
    <div class="toolbar-actions">
      <button class="btn btn-logo">
        <img src="../assets/app.png" alt="logo">
      </button>

      <div class="btn-group pull-right">
        <el-tooltip content="返回" placement="bottom" effect="light">
          <button class="btn btn-default" id="exit">
            <router-link class="pull-left" :to="{ path: path}">
              <span class="icon icon-reply"></span>
            </router-link>
          </button>
        </el-tooltip>
        <el-tooltip content="退出" placement="bottom" effect="light">
          <button class="btn btn-default" id="minimize" @click="exit()">
            <span class="icon icon-logout"></span>
          </button>
        </el-tooltip>
      </div>
    </div>
  </header>
</template>
<style>
  .toolbar .btn-logo{
    border: none;
    box-shadow: none;
    background: none;
  }
  .toolbar .btn-logo > img{
    width:22px;
    height:22px;
    vertical-align: middle;
    -webkit-user-drag: none;
    -webkit-user-select: none;
  }
  .toolbar-actions{
    margin-bottom: 0;
    padding-bottom: 0;
  }
  .toolbar-actions .btn-group .btn,
  .toolbar-actions .btn-group .icon{
    transition: all .2s;
    cursor: pointer;
  }
  .toolbar-actions .btn-group .btn-default:hover{
    background: #eee;
  }
  .toolbar-actions .btn-group .icon-minus{
    padding-top: 5px;
  }
  .toolbar-actions .icon-cancel-circled{
    color: #de3c37;
    font-size: 16px;
  }
</style>
<script>
  export default{
    data(){
      return{
        path: '/home'
      }
    },
    methods:{
      logout(){

      },
      maximize(){
      },
      exit(){
      }
    }
  }
</script>
