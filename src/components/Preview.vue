<template>
  <div id="preview">
    <slot></slot>
    <section data-name="profile"
             v-show="resume.profile">
      <h2> 基本信息  </h2>
      <ul>
        <li> 姓名 ： {{ resume.profile.name }} </li>
        <li> 求职意向：{{ resume.profile.jobIntention }} </li>
        <li> 学历 ： {{ resume.profile.degree }} </li>
        <li> 地址： {{ resume.profile.address }} </li>
        <li v-show="resume.profile.GitHub">
          GitHub ： {{ resume.profile.GitHub }}
        </li>
        <li v-show="resume.profile.blog">
          博客： {{ resume.profile.blog }}
        </li>
      </ul>
    </section>

    <section data-name="education" v-show="resume.education">
      <h2> 教育背景 </h2>
      <p v-for="(item,index) in resume.education"
         v-bind:key="index">
        <span v-show="item.duration">{{item.duration}}  </span>
        <span>{{item.school}}  </span>
        <span>{{item.major}}  </span>
      </p>
    </section>


    <section data-name="project" v-show="resume.project">
      <h2> 项目经历 </h2>
      <div v-for="(item,index) in resume.project"
           v-bind:key="index">
        <h4>{{item.projectName}}</h4>
        <p>{{item.projectIntro}}</p>
      </div>
    </section>


    <section data-name="workHistory" v-show="resume.workHistory">
      <h2> 工作经历 </h2>
      <div v-for="(item,index) in resume.workHistory"
           v-bind:key="index">
        <h4>
          <span>{{item.duration}}</span>
          <span>{{item.company}}</span>
          <span>{{item.job}}</span>
        </h4>
        <p> {{item.content}} </p>
      </div>
    </section>


    <section data-name="skill" v-show="resume.skill">
      <h2> 技能 </h2>
      <ul v-for="item in resume.skill">
        <li>
          {{ item.skillName}}
        </li>
      </ul>
    </section>

    <section data-name="contact" v-show="resume.contact">
      <h2> 联系方式  </h2>
      <ul>
        <li>电话： {{resume.contact.Phone}}</li>
        <li>微信： {{resume.contact.WeChat}}</li>
        <li> QQ： {{resume.contact.QQ}}</li>
        <li>邮箱：{{resume.contact.eMail}}</li>
      </ul>
    </section>
  </div>

</template>

<script>

  export default {
    computed: {
      resume(){
        return this.$store.state.resume
      }
    }
  }

  /*  下面这个可以过滤空对象，使空对象不展示
  isEmpty(obj) {
    let empty = true;
    for (let key in obj) {
      if (obj[key]) {
        empty = false;
        break
      }
    }
    return empty
  },
  filter(array) {
    console.log(array);
    console.log(array.filter((item) => !this.isEmpty(item)));

    return array.filter((item) => !this.isEmpty(item))
  }
  */
</script>

<style lang="scss" scoped>
  #preview {
    min-height: 100px;
    overflow: auto;
    text-align: left;
    position: relative;
    line-height: 2em;
    padding: 3em 4em;
    /*section + section {*/
    /*margin-top: 2em;*/
    /*}*/

    h2 {
      font-size: 18px;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #ccc;
      margin: 16px 0;
    }

    section[data-name="profile"],
    section[data-name="contact"] {
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          min-width: 50%;
        }
      }
    }
    section[data-name="education"] {

      p {
        display: flex;
        span {
          min-width: calc(100% / 3)
        }
      }

    }
    section[data-name="project"],
    section[data-name="workHistory"] {
      white-space: pre-line; // 合并连续的换行符，但是会正确的显示换行符
      div + div {
        margin-top: 16px;
      }
    }
    section[data-name="workHistory"] {
      h4 {
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>
