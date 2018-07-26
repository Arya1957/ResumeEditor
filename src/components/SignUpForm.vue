<template>
  <div>
    <form class="signup" v-on:submit.prevent="signUp">
      <label>用户名 </label>
      <input type="text" v-model="formData.username" required autocomplete="off">
      <label>密码</label>
      <input type="password" v-model="formData.password" required autocomplete="off">
      <div v-show="errorMessage"  class="error">
        <i class="el-icon-error"></i>
        <span >{{errorMessage}}</span>
      </div>
      <input type="submit" value="注册">
    </form>

  </div>
</template>

<script>
  import AV from '../lib/leancloud.js'
  import getErrorMessage from '../lib/getErrorMessage.js'
  import getAVUser from '../lib/getAVUser.js'

  export default {
    name: 'SignUpForm',
    data: function () {
      return {
        errorMessage: '',
        formData: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      signUp() {
        let {username, password} = this.formData;
        var user = new AV.User(); // 新建 AVUser 对象实例
        user.setUsername(username);    // 设置用户名
        user.setPassword(password);    // 设置密码

        user.signUp().then((loggedInUser) => {
          //   console.log(loggedInUser);
          this.$emit('success', getAVUser())
        }, (error) => {
          this.errorMessage = getErrorMessage(error.code);
        });
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
