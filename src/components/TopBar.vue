<template>
  <div id="topbar">
    <div class="logo">
      Resume Editor
    </div>
    <div class="actions">
      <div v-if="logined">
        <span class="welcome">你好， {{ user.username }}</span>
        <el-button type="danger" v-on:click="exit">退出登录</el-button>
        <el-button type="primary" v-on:click="save">保存</el-button>
      </div>
      <div v-else>
        <el-button type="primary"  v-on:click="signUpDialogVisible = true">注册</el-button>
        <el-button type="success" v-on:click="signInDialogVisible = true">登录</el-button>
      </div>
      <el-button class="preview-btn" v-on:click="preview">预览 </el-button>

    </div>
    <Dialog title="注册"
            v-bind:visible="signUpDialogVisible"
            v-on:close="signUpDialogVisible = false">
      <SignUpForm v-on:success="signIn($event)"></SignUpForm>
    </Dialog>
    <Dialog title="登录" v-bind:visible="signInDialogVisible"
            v-on:close="signInDialogVisible=false">
      <SignInForm v-on:success="signIn($event) "></SignInForm>
    </Dialog>
  </div>
</template>

<script>
  import Dialog from './Dialog.vue'
  import AV from '../lib/leancloud.js'
  import SignUpForm from './SignUpForm.vue'
  import SignInForm from './SignInForm.vue'

  export default {
    name: 'TopBar',
    components: {Dialog, SignUpForm, SignInForm},
    data() {
      return {
        signUpDialogVisible: false,
        signInDialogVisible: false
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      logined() {
        return this.$store.state.user.id
      },
      dataSaved(){  // 检测数据是否保存
        return this.$store.state.dataSaved;
      },
    },
    methods: {
      signIn(user) {
        this.signUpDialogVisible = false;
        this.signInDialogVisible = false;
        this.$store.commit('setUser', user);
        if(user.id){
          this.$store.dispatch('fetchResume')
        }
      },
      preview() {
        this.$emit('preview')
      },
      save() {
        this.$store.dispatch('createOrUpdateResume')
      },
      exit() {
        if(!this.dataSaved) {  // 如果数据未保存，会提示
          this.$confirm('未保存数据将会丢失, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            AV.User.logOut();
            this.$store.commit('removeUser');
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消退出'
            });
          });
        } else { //  直接退出
          AV.User.logOut();
          this.$store.commit('removeUser');
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  #topbar {
    min-width: 1024px;
    max-width: 1440px;
    align-self: center;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    font-size: 20px;

    .actions {
      display: flex;
      .welcome {
        padding-right: 16px;
        font-size: 18px;
      }
      .preview-btn {
        margin-left: 16px;
      }
    }
  }
</style>
