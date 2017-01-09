<template>
    <div class="content">
      <mu-appbar title="Gox">
        <mu-flat-button color="white" :label="username" labelPosition="before" slot="right" icon="power_settings_new" @click="logout" title="退出"/>
      </mu-appbar>


      <section>
        <v-plus @click="toAdmin()" v-if="show" :show="show"></v-plus>

        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in apps">
              <a class="slide" :href="item.url" target="_blank">
                <div class="card" :style="{ background: item.color}">
                  {{item.name}}
                </div>
                <div class="action" @click.stop.prevent="">{{item.desc}}</div>
              </a>
            </div>
          </div>
          <div class="swiper-scrollbar"></div>
        </div>
      </section>

      <mu-drawer width="400" :zDepth="4" :open="open" :docked="docked" @close="drawer()">
        <mu-flexbox :gutter="0">
          <mu-flexbox-item>
            上传文件
          </mu-flexbox-item>
          <mu-flexbox-item grow="4">
            <el-upload
              action="//jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </mu-flexbox-item>
        </mu-flexbox>
        <mu-flexbox :gutter="0">
          <mu-flexbox-item>
            服务类型
          </mu-flexbox-item>
          <mu-flexbox-item grow="4">

            <el-select v-model="serverType" placeholder="请选择">
              <el-option label="node" value="1"></el-option>
              <el-option label="java" value="2"></el-option>
              <el-option label="php" value="3"></el-option>
            </el-select>
          </mu-flexbox-item>
        </mu-flexbox>
      </mu-drawer>
    </div>
</template>

<style lang="less">
  .content,
  section{
    position: relative;
    height: 100%;
  }
  section{
    padding: 2% 20px;
  }
  .card,
  .action{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .swiper-slide{
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .swiper-container {
    height: auto!important;
    overflow: inherit;
    margin-left: auto;
    margin-right: auto;
    top: 42%;
    transform: translateY(-45%);
    padding: 0 50px;

    .swiper-slide {
      height: 200px;
      border-radius: 30px;
      padding: 10px;
    }
  }

  .slide{
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    color: #333;
    box-shadow: 0 0 29px 0 rgba(20, 85, 134, 0.79);
    -webkit-user-drag: none;
    -webkit-user-select: none;
    flex: auto;
    background: rgba(113, 111, 111, 0.31);
    border-radius: 50px;
    padding: 10px;

    .action{
      position: absolute;
      bottom: -110px;
      left: 0;
      right: 0;

      padding:0 15px 10px;

      transition: all .45s cubic-bezier(.445,.05,.55,.95);
      justify-content: center;
      align-items: center;
      color: rgba(222, 216, 216, 0.65);
    }
    &:hover{
      .action{
         bottom: 0;
      }
      .card{
        font-size: 20px;
        padding-bottom: 80px;
      }
    }
  }
  .card{
    font-size: 16px;
    font-weight: bold;
    color: rgba(23, 20, 20, 0.67);
    text-shadow: 0 4px 12px rgba(88, 83, 83, 0.75);
    margin: 0;
    height: 100%;
    width: 100%;
    border-radius: 50px;

    cursor: pointer;
    transition: all .4s cubic-bezier(.445,.05,.55,.95);
  }
  .action{
    height: 100px;
    width: 100%;
    background: rgba(19, 16, 16, 0.37);
    box-shadow: 0 0 12px 0 rgba(185, 176, 176, 0.48);

    &,.mu-icon-button{
      cursor: default;
    }
    .mu-icon-button,
    .mu-icon,.icon{
      transition: all .4s cubic-bezier(.445,.05,.55,.95);
    }
    .mu-icon,.icon{
      color: rgba(208, 200, 200, 0.84);
      -webkit-user-drag: none;
      -webkit-user-select: none;
    }
    .mu-icon-button:hover{
      background: rgba(241, 239, 239, 0.07);
      .mu-icon,.icon{
        color: rgba(251, 249, 249, 0.73);
      }
    }
  }

  .mu-drawer{
    padding: 16px;
  }

</style>

<script>
    import Vue from 'vue'
    import VPlus from './Plus.vue'

    import Swiper from '../assets/js/swiper-3.4.0.min.js'
    import '../assets/css/swiper-3.4.0.min.css'

    import {Boot} from '../store/boot'

    export default{
      name: 'main',
      data() {
        return {
          swiperOption: {
            slidesPerView: 4,
            slidesPerColumn: 2,
            spaceBetween: 30,
            scrollbar:'.swiper-scrollbar',
            scrollbarDraggable : true ,
            scrollbarSnapOnRelease : true ,
            mousewheelControl: true,
            keyboardControl : true,
            centeredSlides: false,
            observer:true
          },
          apps: [{
            id: 1,
            name: 'Gsui',
            status: 1,
            color: '#5fbf0b',
            url: 'http://172.16.8.60:8080/gsui',
            desc: 'UI Component'
          },
          {
            id: 2,
            name: 'gosuncn-web',
            status: 1,
            color: '#9b64ce',
            url: 'http://172.16.8.60:8080/gosuncn-web',
            desc: 'gosuncn-web'
          },
          {
            id: 3,
            name: 'SwaggerUI',
            status: 1,
            color: '#4d9bff',
            url: 'http://172.16.8.60:8080/apis',
            desc: 'Restfull API Document Generator'
          },
          {
            id: 4,
            name: 'Jserver --- 开发中...',
            status: 1,
            color: '#2075a5',
            url: '',
            desc: '前端API 模拟数据服务'
          },
          {
            id: 5,
            name: 'Gis --- 整理中...',
            status: 1,
            color: '#18a892',
            url: '',
            desc: 'gis 地图服务 demo'
          },
          {
            id: 6,
            name: 'GoDocs --- 开发中...',
            status: 1,
            color: '#7c5955',
            url: '',
            desc: 'Javascript/Java 文档生成器及管理平台'
          }],
          defaultPort: 8081,
          swiper: null,
          open: false,
          docked: true,
          serverType: 'node',
          show: false,

          username: ''
        }
      },
      computed: {
        currentPort(){
          return this.defaultPort++;
        }
      },
      watch: {
        username (){
          return this.username.toLowerCase();
        }
      },
      beforeMount(){

      },
      mounted() {
        this.swiper = new Swiper('.swiper-container', this.swiperOption);
        if(sessionStorage.getItem('username') === 'gox') this.show = true;
        this.username = sessionStorage.getItem('username');

        this.initApps();
      },
      methods: {
        toAdmin(){
          this.$router.push('admin')
        },
        drawer(flag){
          this.open = !this.open;
          this.docked = !flag;
        },
        initApps(){
          const _this = this;
          const url = 'http://localhost:3000/api/app/';
          _this.$http.get(url).then((response) => {
            const data = response.data;
            if(data.result){
             _this.apps = data.message.filter((app) => {
                return app.use
             })
            }else{
             _this.$message('获取数据失败');
             _this.apps = [];
            }
          })
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },
        logout(){
          sessionStorage.setItem('username','');
          this.$router.push('login')
        }
      },
      components: {
        VPlus
      },
      destroy(){
        this.username = "";
        console.log('destroy user' + sessionStorage.getItem('username'))
      }
    }
</script>
