<template>
  <div class="login-wrap">
    <div class="quote">
      <h3 class="line1">gox</h3>
      <h5 class="line2">应用发布平台(Node/PHP/Java)</h5>
    </div>
    <div class="login-panel">
      <mu-raised-button label="admin" class="log-button" primary @click="dialogFormVisible = true"/>
      <mu-raised-button label="guest" class="log-button" secondary @click="goToDashboard"/>

      <el-dialog title="登录" v-model="dialogFormVisible">
        <el-form :model="form" ref="form" :rules="rules" >
          <el-form-item label="账号" prop="name" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
            <el-input  type="password" v-model="form.password" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit" @keyup.enter="submit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>


</template>
<style lang="less">

  .quote {
    position: fixed;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
  }
  h3 {
    display: block;
    text-rendering: optimizeLegibility; /* Better kerning, worse performance */
  }
  .line1 {
    font: 7rem/7.5rem 'Lato', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.35rem;
    color: rgba(19, 52, 95, 0.9);
    text-shadow: -4px 3px 0 #424242,
    -6px 5px 0 rgba(255,255,255,0.125);
    margin: 10px 0 0;
  }
  .line2 {
    font: 2.5rem/4.5rem 'Lato', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.35rem;
    color: rgba(178, 197, 188, 0.61);
    text-shadow: 6px -3px 0 #424242, -5px 5px 0 rgba(255, 255, 255, 0.125);
    filter: blur(1.6px);
    margin:0;
  }

  .login-wrap{
    height:100%;
    background: -webkit-gradient(linear, left top, left bottom, from(rgba(211, 220, 230, 0.63)), color-stop(2%, #d8e3e4));
  }
  .login-panel{
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;

    filter: blur(0);

    position: relative;
    margin-left: auto;
    margin-right: auto;
    top: 42%;
    transform: translateY(-45%);

    .log-button{
      height: 10em;
      width: 10em;
      margin-right: 7em;
      margin-left:7em;
      border-radius: 10em;
    }
  }

  .el-dialog--small{
    width: 40%;
    .el-form{
      width: 70%;
    }
  }
</style>
<script>
  import Vue from 'vue'
  import VueResource from'vue-resource';
  Vue.use(VueResource);

  import Config from '../config/index'

  export default{
    data(){
      return{
        msg:'hello vue',
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          password: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        formLabelWidth: '80px'
      }
    },
    mounted(){
      document.addEventListener('contextmenu',function(e){
         e.preventDefault();
         e.stopPropagation();
      })
    },
    methods: {
      // guest to dashboard
      goToDashboard() {
         const url = Config.host + Config.httpUrl.auth;
         this.$http.get(url).then((response) => {
            if(response.status === 200){
              const res = response.data;
              if(res.result){
                 sessionStorage.setItem('username', res.message.name);
                 this.$router.push('home')
              }else {
                 this.$message('出错了');
                 return false;
              }
            }else{
               this.$message('出错了');
               return ;
            }
         })
      },
      reset() {
        //this.$refs.form.resetFields();
      },
      // admin
      submit(ev) {
        this.$refs.form.validate((valid) => {
          if(!valid) return false;

          const url = Config.host + Config.httpUrl.auth;
          this.$http.post(url, this.form).then((response) => {
            if(response.status === 200){
              const res = response.data;
              if(res.result){
                 sessionStorage.setItem('username', res.message.name);
                 this.$message({title: '成功',message: '登陆成功',duration: 1500});
                 setTimeout(() => {
                    this.$router.push('home')
                 },1500)
              }else {
                 this.$message(res.message);
                 return false;
              }
            }else{
               this.$message('服务出错');
               return ;
            }
          })
        })

      }

    }
  }
</script>
