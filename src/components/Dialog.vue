<template>
  <div class="dialog-wrapper"
       v-show="visible">
    <div class="dialog">
      <header>
        <span>{{title}}</span>
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
    name: 'Dialog',
    props: ['visible', 'title'],
    methods: {
      close() {
        this.$emit('close')
      }
    }
  }
</script>

<style lang="scss">
  .dialog-wrapper {
    position: fixed;
    background: rgba(0, 0, 0, 0.2);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;;
    .dialog {
      background: #fff;
      min-height: 4em;
      min-width: 20em;
      box-shadow: 0 3px 10px 1px rgba(0, 0, 0, 0.2);
      > header {
        display: flex;
        justify-content: space-between;
        padding: 16px 24px;
        background: #31c27c;
        color: #fff;
      }

      > main {
        padding: 24px;
        color: #757575;

        form {
          input[type='submit'] {
            display: block;
            width: 100%;
            padding: 8px 0;
            background: #31c27c;
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
  }

</style>
