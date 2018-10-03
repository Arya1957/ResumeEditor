<template>
  <div id="app" v-bind:class="{previewMode: previewMode}">
    <div class="page">
      <el-button class="exitPreview" type="danger" v-show="previewMode === true" v-on:click="exitPreview">退出预览
      </el-button>
      <TopBar class="topbar" v-on:preview="preview" v-show="previewMode === false"></TopBar>
      <main>
        <Editor class="editor" v-show="previewMode === false"></Editor>
        <Preview class="preview" v-bind:previewMode="previewMode" v-on:exitPreview="exitPreview">
        </Preview>
      </main>
      <div class=" save-alerts">
        <div class="success" v-show="saveSuccess">
          <i class="el-icon-success"></i>
          <span>保存成功</span>
        </div>
        <div class="error" v-show="saveError">
          <i class="el-icon-error"></i>
          <span>更新数据失败，请重试</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import TopBar from "./components/TopBar.vue";
import Editor from "./components/Editor.vue";
import Preview from "./components/Preview.vue";

import store from "./store/store.js";
import AV from "./lib/leancloud.js";
import getAVUser from "./lib/getAVUser.js";

getAVUser();
export default {
  name: "App",
  store,
  //  通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到。
  components: { TopBar, Editor, Preview },
  data() {
    return {
      previewMode: false
    };
  },
  computed: {
    saveSuccess() {
      return this.$store.state.saveSuccess;
    },
    saveError() {
      return this.$store.state.saveError;
    }
  },
  methods: {
    preview() {
      this.previewMode = true;
    },
    exitPreview() {
      this.previewMode = false;
    } 
  },
  created() {
    let localstate = JSON.parse(localStorage.getItem("state"));
    if(localstate.user.id) {
      // 如果用户存在，则将本地缓存与 state合并
      this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(localStorage.getItem("state"))));
    }
    //在页面关闭/刷新时将vuex里的信息保存到 localStorage 里
   window.onbeforeunload = function(e) {
    return '确定离开此页吗？'; 
}

    window.addEventListener("beforeunload", (e) => {
      localStorage.setItem("state", JSON.stringify(this.$store.state));
    })
  }
};
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%; // height: 100vh 的代替方案
  overflow: auto;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app .page {
  display: flex;
  flex-direction: column;
  height: 100%;

  > .topbar {
    height: 80px;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.4);
    z-index: 1;
  }
  > .exitPreview {
    position: fixed;
    top: 10px;
    right: 10px;
  }

  > main {
    min-width: 1024px;
    max-width: 1440px;
    width: 100%;
    align-self: center; //这两句是为了修复当分辨率大于1440时，main不居中的问题
    flex: 1;
    background: #efefef;
    display: flex;
    padding: 16px;

    .editor {
      width: 32em;
      margin-right: 16px;
      box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.4);
      border-radius: 4px;
      background: #fff;
    }

    .preview {
      flex: 1;
      box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.4);
      border-radius: 4px;
      background: #fff;
    }
  }
  > .save-alerts {
    position: absolute;
    background: rgba(0, 0, 0, 0.2);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    > div > i {
      font-size: 16px;
      margin-right: 8px;
    }

    .success {
      background: #f0f9eb;
      color: #67c23a;
    }
    .error {
      background-color: #fef0f0;
      color: #f56c6c;
    }
  }

  .save-alerts > .success,
  .save-alerts > .error {
    width: 300px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
  }
}

#app.previewMode {
  .preview {
    margin: 24px auto;
    max-width: 900px;
  }
}

.page {
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  label {
    color: #606266;
    display: block;
    margin: 8px 0;
    font-size: 14px;
    text-align: left;
  }

  input[type="text"],
  input[type="password"],
  textarea {
    color: #606266;
    font-size: 14px;
    width: 100%;
    outline: none;
    margin: 8px 0;
    padding: 0 16px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
  }

  input[type="text"]:focus,
  input[type="password"]:focus,
  textarea:focus {
    border: 1px solid #3e80eb;
  }

  input[type="text"],
  input[type="password"] {
    line-height: 40px;
    height: 40px;
  }

  textarea {
    line-height: 24px;
  }

  input[type="submit"] {
    outline: none;
  }
}
</style>
