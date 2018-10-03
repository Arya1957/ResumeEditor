<template>
  <div class="sign-in">
    <form class="signin" v-on:submit.prevent="signIn">
      <label>用户名</label>
      <input type="text" v-model="formData.username" required autocomplete="on">
      <label>密码 </label>
      <input type="password" v-model="formData.password" required autocomplete="on">
      <div v-show="errorMessage" class="error">
        <i class="el-icon-error"></i>
        <span>{{errorMessage}}</span>
      </div>
      <input type="submit" value="登录">
    </form>

  </div>
</template>

<script>
import AV from "../lib/leancloud.js";
import getErrorMessage from "../lib/getErrorMessage.js";
import getAVUser from "../lib/getAVUser";

export default {
  name: "SignInForm",
  data: function() {
    return {
      errorMessage: "",
      formData: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    signIn() {
      AV.User.logIn(this.formData.username, this.formData.password).then(
        () => {
          this.$emit("success", getAVUser());
        },
        error => {
          this.errorMessage = getErrorMessage(error.code);
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
