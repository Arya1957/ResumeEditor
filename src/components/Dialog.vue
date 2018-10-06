<template>
  <div class="dialog-wrapper" v-show="visible">
    <div class="dialog">
      <header>
        <span> {{ title }}</span>
        <i class="close el-icon-close" v-on:click="close"></i>
      </header>
      <main>
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  props: ["visible", "title"],
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss">
.dialog-wrapper {
  position: fixed;
  background-image: url("../assets/image/sky.jpg");
  background-size: cover;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .dialog {
    background: #fff;
    min-height: 4em;
    min-width: 18em;
    border-radius: 4px;
    box-shadow: 2px 3px 10px 1px rgba(255, 255, 255, 0.3);
    > header {
      position: relative;
      padding: 12px 16px;
      span {
        cursor: default;
      }
      .close {
        top: 12px;
        position: absolute;
        right: 12px;
        cursor: pointer;
      }
    }

    > main {
      padding: 24px;
      color: #757575;
    }

    form {
      input[type="submit"] {
        display: block;
        width: 100%;
        padding: 10px 0;
        background: #292929;
        border-radius: 4px;
        margin: 16px 0;
        color: #fff;
      }
      .error {
        margin: 16px 0;
        height: 40px;
        line-height: 40px;

        background: #fef0f0;
        color: #f56c6c;
        .el-icon-error {
          color: red;
          font-size: 16px;
        }
        span {
          font-size: 14px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
