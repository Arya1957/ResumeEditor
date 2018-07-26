<template>
  <div id="editor">
    <nav>
      <ol>
        <li v-for="(item,index) in resume.config"
            v-bind:class="{active: item.title === selected}"
            v-on:click="selected = item.title">
          <svg class="icon">
            <use v-bind:xlink:href="`#icon-${item.icon}`"></use>
          </svg>
        </li>
      </ol>
    </nav>
    <ol class="panels">
      <li v-for="(item,index) in resume.config"
          v-show="item.title===selected">
        <div v-if="resume[item.title] instanceof Array">
          <h2> {{titles[item.title]}} </h2>
          <div class="container" v-for="(subitem,index) in resume[item.title]">
            <div v-for="(value,key) in subitem">
              <label>{{ labels[key] || key}}</label>
              <div v-if="key === 'projectIntro' || key ==='content'">
                  <textarea rows="4"
                            v-bind:value="value"
                            v-on:input="updateContent(`${item.title}.${index}.${key}`,$event.target.value)"
                  ></textarea>
              </div>
              <div v-else>
                <input type="text" v-bind:value="value"
                       v-on:input="updateContent(`${item.title}.${index}.${key}`,$event.target.value)">
              </div>
            </div>

            <i class="el-icon-delete"
               v-on:click="removeItem(item.title,index)"
            ></i>
            <hr>
          </div>
          <a href="#" class="add"
             v-on:click="addItem(item.title)"
          >
            <svg class="icon">
              <use xlink:href="#icon-add"></use>
            </svg>
          </a>

        </div>
        <div v-else>
          <h2> {{ titles[item.title]}}</h2>
          <div v-for="(value,key) in resume[item.title]">
            <label> {{labels[key] || key}} </label>
            <input type="text"
                   v-bind:value="value"
                   v-on:input="updateContent(`${item.title}.${key}`,$event.target.value)">
          </div>
        </div>

      </li>
    </ol>
  </div>
</template>

<script>
  export default {
    name: 'Editor',
    computed: {
      selected: {
        get() {
          return this.$store.state.selected
        },
        set(value) {
          return this.$store.commit('switchTab', value)

        }
      },
      resume() {
        return this.$store.state.resume
      },
      labels() {
        return this.$store.state.labels
      },
      titles() {
        return this.$store.state.titles
      }
    },
    methods: {
      updateContent(path, value) {
        this.$store.commit('updateContent', {path, value})
      },
      addItem(title) {
        this.$store.commit('addItem', title)
      },
      removeItem(path, index) {
        this.$confirm('此操作不可恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.commit('removeItem', {path, index});
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }

    }
  }
</script>

<style lang="scss" scoped>
  #editor {
    display: flex;
    > nav {
      width: 80px;
      background: #000;
      > ol > li {
        padding: 16px;

        > .icon {
          width: 24px;
          height: 24px;
          fill: #fff;
        }
        &.active {
          background: #fff;
          > .icon {
            fill: #000;
          }
        }
      }
    }
    > .panels {
      flex: 1;
      padding: 32px;
      overflow: auto;
      height: 100%;
      text-align: left;

      li {
        h2 {
          margin-bottom: 24px;
        }
        .container:nth-child(2) {
          .el-icon-delete {
            display: none;
          }
        }
        .container {
          position: relative;
          margin-bottom: 16px;
          .el-icon-delete {
            cursor: pointer;
            position: absolute;
            top: 0;
            right: 0;
          }
        }

        .add {
          display: flex;
          align-items: center;
          .icon {
            width: 1.75em;
            height: 1.75em;
          }
        }

      }
      hr {
        border: none;
        border-top: 1px solid #b3b2b2;
        margin: 32px 0;
      }

    }
  }


</style>
