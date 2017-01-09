<template>
  <div class="detail">
    <mu-appbar title="Gox">
      <mu-icon-button icon='menu' slot="left" @click="drawer"/>
      <div slot="right" class="right-bar">
        <el-tooltip content="返回" placement="bottom" effect="light" class="back">
          <router-link :to="{ path: path}" class="pull-right back">
            <mu-flat-button color="white" icon="reply" />
          </router-link>
        </el-tooltip>

        <el-tooltip content="退出" placement="bottom" effect="light" class="logout">
          <mu-flat-button color="white" :label="username" labelPosition="before" icon="power_settings_new" @click="logout" title=""/>
        </el-tooltip>
      </div>
    </mu-appbar>

    <!--工具条-->
    <el-col :span="24" class="toolbar search">
      <el-form :inline="true" class="search-form-inline">
        <el-form-item>
          <el-input v-model="searchText" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <template>
      <div class="table">
        <el-table :data="computedAppList" border v-loading="listLoading" style="width: 100%" :height="tableHeight">
          <el-table-column type="index" label="编号" align="center">
          </el-table-column>
          <el-table-column prop="name" label="名称" align="center">
          </el-table-column>
          <el-table-column prop="path" label="部署路径" align="center">
          </el-table-column>
          <el-table-column prop="type" label="应用类型" :formatter="formatType" align="center">
          </el-table-column>
          <el-table-column prop="url" label="访问路径" align="center">
          </el-table-column>
          <el-table-column prop="desc" label="应用描述" align="center">
          </el-table-column>

          <el-table-column :context="_self" inline-template align="center" label="操作">
            <div>
              <el-tooltip content="编辑" placement="bottom" effect="light">
                <el-button
                  size="small"
                  icon="edit"
                  @click="handleEdit($index,row)">
                </el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="bottom" effect="light">
                <el-button
                  size="small"
                  icon="delete"
                  @click="handleRemove($index, row)">
                </el-button>
              </el-tooltip>
              <el-tooltip :content="row.use ? '禁用' : '启用'" placement="bottom" effect="light">
                <button type="button" class="el-button el-button--default el-button--small" @click="useApp($index, row)">
                  <i class="material-icons">{{row.use ? 'visibility' : 'visibility_off'}}</i>
                </button>
              </el-tooltip>
              <el-tooltip content="打开" placement="bottom" effect="light">
                <button type="button" class="el-button el-button--default el-button--small" @click="openApp($index,row)">
                  <i class="material-icons">open_in_new</i>
                </button>
              </el-tooltip>
            </div>
          </el-table-column>
        </el-table>
      </div>
    </template>

    <!--分页-->
    <el-col :span="24" class="toolbar page" style="padding-bottom:10px;">
      <el-pagination :current-page="currentPage" :page-sizes="[15,30, 50,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next"
                     :total="tableData.length" style="float:right"
                     @size-change="sizeChange" @current-change="pageChange">
      </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog :title="dialogActiontitle" v-model="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="appItem" id="appform" class="app-form" label-width="120px" :rules="editFormRules" ref="appItem">
        <el-form-item label="应用名称" prop="name">
          <el-input v-model="appItem.name" name="name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="应用类型">
          <el-select v-model="appItem.type" name="type" :disabled="disableField">
            <el-option v-for="item in serviceType" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="应用程序" v-if="!appItem.path">
          <input type="file" name="app" accept="application/zip" :disabled="disableField">
        </el-form-item>
        <el-form-item label="应用程序" v-else>
          <el-input type="text" v-model="appItem.path" name="app" :disabled="disableField"></el-input>
        </el-form-item>
        <el-form-item label="访问URL">
          <el-input type="text" v-model="appItem.url" name="url" disabled></el-input>
        </el-form-item>
        <el-form-item label="应用描述">
          <el-input type="textarea" v-model="appItem.desc" name="desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">{{btnEditText}}</el-button>
      </div>
    </el-dialog>

    <mu-drawer width="400" :zDepth="3" :open="open" :docked="docked" @close="drawer">
      <mu-appbar title="服务管理">
        <mu-icon-button icon='settings_input_svideo' slot="left" @click="drawer"/>
        <mu-icon-button icon="close" @click="drawer" slot="right"/>
      </mu-appbar>
      <article class="service">
        <mu-flexbox :gutter="0">
          <mu-flexbox-item>
            PHP
          </mu-flexbox-item>
          <mu-flexbox-item grow="4">
            <mu-raised-button class="demo-raised-button" label="启动" labelPosition="after" icon="play_circle_outline" @click="start(1)"/>
            <mu-raised-button class="demo-raised-button" label="停止" labelPosition="after" icon="stop" @click="stop(1)"/>
            <mu-raised-button class="demo-raised-button" label="重启" labelPosition="after" icon="replay" @click="restart(1)" disabled/>
          </mu-flexbox-item>
        </mu-flexbox>
        <mu-divider/>
        <mu-flexbox :gutter="0">
          <mu-flexbox-item>
            Node
          </mu-flexbox-item>
          <mu-flexbox-item grow="4" >
            <mu-raised-button class="demo-raised-button" label="启动" labelPosition="after" icon="play_circle_outline" @click="start(2)"/>
            <mu-raised-button class="demo-raised-button" label="停止" labelPosition="after" icon="stop" @click="stop(2)"/>
            <mu-raised-button class="demo-raised-button" label="重启" labelPosition="after" icon="replay" @click="restart(2)" />
          </mu-flexbox-item>
        </mu-flexbox>
        <mu-divider/>
        <mu-flexbox :gutter="0">
          <mu-flexbox-item>
            Java
          </mu-flexbox-item>
          <mu-flexbox-item grow="4">
            <mu-raised-button class="demo-raised-button" label="启动" labelPosition="after" icon="play_circle_outline" @click="start(3)"/>
            <mu-raised-button class="demo-raised-button" label="停止" labelPosition="after" icon="stop" @click="stop(3)"/>
            <mu-raised-button class="demo-raised-button" label="重启" labelPosition="after" icon="replay" @click="restart(3)" disabled/>
          </mu-flexbox-item>
        </mu-flexbox>
      </article>
    </mu-drawer>
  </div>
</template>
<style lang="less">
  .detail{
    background: #fff;
    height: 100%;
    .nav{
      padding: 5px 10px;
      float: left;

    }
    .logout{
      height:100%;
      > div{
        height:100%;
      }
    }
    .back{
      display: inline-block;
      width:50px;
      height:100%;
      > div{
        height:100%;
      }
       button{
        width:100%;
      }
    }
  }
  .right-bar{
    height:100%;
    .back,.logout{
      height:100%;
    }
    .back{
      vertical-align: top;
    }
    .logout{
      vertical-align: text-bottom;
    }
  }
  .table{
    padding: 10px 16px;
    overflow: auto;

    .cell .el-tooltip {
      display: inline-block;
    }

    tr:active, .table-striped tr:active:nth-child(even) {
      color: inherit;
    }
  }

  .toolbar.search{
    border-bottom:1px solid #eee;
  }
  .toolbar.page,
  .toolbar.search{
    min-height: inherit;
    background-color: transparent;
    background-image: none;
    box-shadow: none;
  }

  .app-form{
    width: 480px;
  }
  .el-form{
    .el-dragger{
      height: 120px;
    }

    .el-dragger .el-icon-upload {
      margin: 20px 0 16px;
      line-height: 40px;
    }

  }
  .el-dialog__body {
    .el-form-item__content{
      padding-top:5px;
      line-height:1.4;
    }
  }
  .search-form-inline{
    text-align: right;
    padding: 5px 16px;

    .el-form-item {
      margin: 0;
      vertical-align: middle;
    }
    .el-input {
       width: 100%;
    }
  }

  .el-button i{
    font-size: inherit;
  }

  .mu-drawer{
    padding: 0;

    .mu-appbar {
      background-color: rgba(70, 73, 74, 0.75);
    }
    .service{
      padding: 16px;
    }
    .mu-flexbox{
      padding: 16px 10px;
    }
    .mu-appbar-title{
      font-size:18px;
    }
  }

  .mu-raised-button.disabled{
    vertical-align: top;
  }

</style>
<script>

  import VHeader from '../components/Header'
  import Vue from 'vue'
  import VueResource from'vue-resource';
  Vue.use(VueResource);

  export default {
    data() {
      return {
        tableData: [],

        path: '/home',
        service: true,

        dialogFormVisible: false,
				dialogActiontitle:'编辑',//编辑界面标题

				appItem: {
				  name: '',
          path: '',
          type: 'node',
          icon: '',
          desc:'',
          url: ''
				},
				editLoading:false,     // 编辑loading
				listLoading:false,    // 表格数据loading
				btnEditText:'提 交',
				editFormRules:{
					name:[
						 { required: true, message: '请输入应用名称', trigger: 'blur' }
					]
				},

				serviceType: ['java','node','php'],

				tableHeight: 450,
				serverType: 'node',
				disableField: false,

				searchText: '',      // 查询关键字
				username: '',        // 用户

				currentPage: 1,
				pageSize: 15,

				open: false,
        docked: true,
        show: false
      }
    },
    watch: {
      username (){
        return this.username.toLowerCase();
      }
    },
    computed:{
      computedAppList(){
        const _this = this;
        let computedList = this.tableData.filter(function (item) {
          const search = _this.searchText.toLowerCase();
          const type = ['java','node','php'].includes(search);
          return type ? item.type ===search : item.name.toLowerCase().indexOf(search) !== -1
        });
        return computedList.slice(this.currentPage - 1,this.pageSize);
      }
    },
    mounted() {
      this.username = sessionStorage.getItem('username');
      this.initTableList();
    },
    methods: {
      formatType:function(row,column){
				//return row.type==1?'node':row.type==2?'java':'php';
				return row.type;
			},
      logout(){
         sessionStorage.setItem('username','');
         this.$router.push('login')
      },
      randomColor() {
         let colors = ['#5fbf0b','#ffb718','#9b64ce','#4d9bff','#2075a5','#18a892','#7c5955','#ce09c9'];
         return colors[Math.floor(Math.random()*8)];
         // return '#' + Math.floor(Math.random()*16777215).toString(16);
      },
      drawer(flag){
         this.open = !this.open;
         this.docked = !flag;
      },
      // 初始化表格
      initTableList(){
        const self = this;
        const url = 'http://localhost:3000/api/app/';
				this.$http.get(url).then((response) => {
					const data = response.data;
					if(data.result){
					 //self.tableData = data.message.filter((app) => {
           //   return app.use
					 //})
					 self.tableData = data.message;
					}else{
					 self.$message('获取数据失败');
					 self.tableData = [];
					}
				})
      },
      // 添加
      handleAdd:function(){
				this.dialogFormVisible=true;
				this.disableField = false;
				this.dialogActiontitle='新增';

        this.appItem.name = '';
        this.appItem.path = "";
        this.appItem.type = "node";
        this.appItem.icon = "";
        this.appItem.desc = "";
        this.appItem.url = "";
			},
			// 编辑
			handleEdit(index, row) {
        this.dialogFormVisible = true;
        this.disableField = true;
				this.dialogActiontitle='编辑';
        const self = this;

        const url = 'http://localhost:3000/api/app/' + row._id;
				this.$http.get(url).then((response) => {
					const data = response.data;
					if(data.result){
					 self.appItem = data.message;
					}else{
					 self.$message('获取数据失败');
					}
				})
      },
      // 删除
      handleRemove(index, row) {
				var _this=this;
				this.$confirm('确认删除该记录吗?', '提示').then(() => {
					_this.listLoading=true;

					const url = 'http://localhost:3000/api/app/' + row._id;
          this.$http.delete(url).then((response) => {
            const data = response.data;
            if(data.result){
             _this.listLoading=false;
             _this.$notify({
							 title: '成功',
							 message: '删除成功',
							 type: 'success'
						 });
             for(var i=0;i<_this.tableData.length;i++){
							 if(_this.tableData[i]._id==row._id){
								 _this.tableData.splice(i,1);
								 break;
							 }
						 }
            }else{
             _this.listLoading=false;
             self.$message('删除失败');
            }
          })
				}).catch(() => {
           _this.listLoading=false;
           self.$message('删除失败');
				});
      },
      // 打开应用
      openApp(index, row){
        window.open(row.url)
      },
      // 启用app
      useApp(index, row){
        const _this = this;
        const url = 'http://localhost:3000/api/app/' + row._id;
        const updateUrl = 'http://localhost:3000/api/app/' + row._id;

        const _curApp = _this.tableData[index];

        _this.$http.get(url).then((response) => {
          if(response.status === 200){
            const data = response.data;
            if(data.result){
               const app = data.message;
               let use = app['use'];
               app.use = !use;
               _curApp.use = app.use;

                _this.$http.put(updateUrl,app).then((res) => {
                  (res.status === 200 && response.data.result) ?  _this.$message(!use ? '已启用' : '已禁用')
                        : _this.$message(!use ? '无法启用' : '无法禁用');
                })
            }else{
               _this.$message('获取数据失败');
            }
          }else{
            _this.$message('服务出错');
            return ;
          }
        })
      },
      // 提交
      editSubmit:function(){
				const _this=this;
				_this.$refs.appItem.validate((valid)=>{
					if(valid){
						_this.$confirm('确认提交吗？','提示',{}).then(()=>{
							_this.editLoading=true;
							_this.btnEditText='提交中';

							if(!_this.appItem._id){//添加
								const formdata = new FormData(document.querySelector('#appform'));
								formdata.append('color',_this.randomColor())
								const url = 'http://localhost:3000/api/upload';

                _this.$http.post(url, formdata).then((response) => {

                  if(response.status === 200){
                    const data = response.data;
                    if(data.result){
                      _this.editLoading=false;
								      _this.btnEditText='提 交';
								     // _this.$notify({
                     //   title: '成功',
                     //   message: '提交成功',
                     //   type: 'success'
                     // });

                      const app = data.message;
                      _this.tableData.push(app);
                    }else{
                      _this.$message('上传失败');
                    }
                  }else{
                     _this.$message('服务出错');
                     return ;
                  }
                  _this.dialogFormVisible = false;
                })
						  }else{//编辑

							}
						});
					}
				});
			},
			// 切换页码
			pageChange(currentPage){
         console.log('currentPage',currentPage)
         this.currentPage = currentPage;
			},
			//
			sizeChange(size){
        console.log('size',size);
        this.pageSize = size;
			},
			start(t){
			  const _this = this;
			  const url = 'http://localhost:3000/api/start';
			  const type = t == 1 ? 'php' : t == 2 ? 'node' : 'java';
        _this.$http.post(url, {type: type,action: 1}).then((response) => {
            if(response.status === 200 && response.data.result){
              _this.$message(`即将启动 ${type} 服务...`);
            }
        })
			},
			stop(t){
			  const _this = this;
			  const url = 'http://localhost:3000/api/start';
			  const type = t == 1 ? 'php' : t == 2 ? 'node' : 'java';
        _this.$http.post(url, {type: type,action: 2}).then((response) => {
            if(response.status === 200 && response.data.result){
              _this.$message(`即将停止 ${type} 服务...`);
            }
        })
			},
			restart(t){
			  const _this = this;
			  const url = 'http://localhost:3000/api/start';
			  const type = t == 1 ? 'php' : t == 2 ? 'node' : 'java';
        _this.$http.post(url, {type: type,action: 3}).then((response) => {
            if(response.status === 200 && response.data.result){
              _this.$message(`即将重启 ${type} 服务...`);
            }
        })
			}
    },
    components:{
      VHeader
    }
  }
</script>
