<template>
  <div id="preview">
    <header id="resume-header">
      <div class="left clearfix">
        <div class="title">个人简历</div>
        <div class="title-intro"> Personal Resume </div>
      </div>
      <div class="right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-boshimao"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-work"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-pen"></use>
        </svg>
      </div>
    </header>
    <div id="separator"></div>
    <div id="resume-content">
      <section data-name="profile" v-show="resume.profile">
        <header class="item-header">
          <div class="wrapper">
            <h2 class="title"> 基本信息 </h2>
          </div>
        </header>

        <ul class="profile details">
          <li> 姓名 ： {{ resume.profile.name }} </li>
          <li> 求职意向：{{ resume.profile.jobIntention }} </li>
          <li> 学历 ： {{ resume.profile.degree }} </li>
          <li>电话： {{resume.profile.Phone}}</li>
          <li v-show="resume.profile.WeChat">微信： {{resume.profile.WeChat}}</li>
          <li v-show="resume.profile.QQ"> QQ： {{resume.profile.QQ}}</li>
          <li>邮箱：{{resume.profile.eMail}}</li>
          <li v-show="resume.profile.address"> 地址： {{ resume.profile.address }} </li>
          <li v-show="resume.profile.GitHub">
            GitHub ： {{ resume.profile.GitHub }}
          </li>
          <li v-show="resume.profile.blog">
            博客： {{ resume.profile.blog }}
          </li>
        </ul>
      </section>

      <section data-name="education">
        <header class="item-header">
          <div class="wrapper">
            <h2 class="title"> 教育背景</h2>
          </div>
        </header>
        <div class="education details" v-for="(item,index) in resume.education" v-bind:key="index">
          <span v-show="item.duration">{{item.duration}} </span>
          <span>{{item.school}} </span>
          <span>{{item.major}} </span>
        </div>
      </section>

      <section data-name="project" v-show="resume.project">
        <header class="item-header">
          <div class="wrapper">
            <h2 class="title"> 项目经历</h2>
          </div>
        </header>
        <div class="details project" v-for="(item,index) in resume.project" v-bind:key="index">
          <h4>{{item.projectName}}</h4>
          <p>{{item.projectIntro}}</p>
        </div>
      </section>

      <section data-name="workHistory" v-show="resume.workHistory">
        <header class="item-header">
          <div class="wrapper">
            <h2 class="title"> 工作经历 </h2>
          </div>
        </header>

        <div class="work-history details" v-for="(item,index) in resume.workHistory" v-bind:key="index">
          <h4>
            <span>{{item.duration}}</span>
            <span>{{item.company}}</span>
            <span>{{item.job}}</span>
          </h4>
          <p> {{item.content}} </p>
        </div>
      </section>

      <section data-name="skill" v-show="resume.skill">

        <header class="item-header">
          <div class="wrapper">
            <h2 class="title"> 技能 </h2>
          </div>
        </header>

        <ul class="skill details">
          <li v-for="(item,index) in resume.skill" :key="index">
            {{ item.skillName}}
          </li>
        </ul>
      </section>

      <section data-name="evaluation">
        <header class="item-header">
          <div class="wrapper">
            <h2 class="title"> 自我评价 </h2>
          </div>
        </header>
        <div class="evaluation details" v-for="(item,index) in resume.evaluation" :key="index">
          {{ item. evaluation }}
        </div>
      </section>
    </div>
    </div>

</template>

<script>
export default {
  computed: {
    resume() {
      return this.$store.state.resume;
    }
  }
};

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
  font-family: Microsoft YaHei;
}
/*section + section {*/
/*margin-top: 2em;*/
/*}*/

/* 简历头部 */
#resume-header {
  padding: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    height: 50px;
    line-height: 50px;
    .title {
      float: left;
      font-size: 50px;
      font-weight: 500;
      border-right: 3px solid;
      padding-right: 8px;
      margin-right: 8px;
    }

    .title-intro {
      float: left;
      font-size: 24px;
      line-height: 25px;
      font-weight: 500;
      &::before {
        content: "细心从每个细节开始。";
        font-size: 12px;
        display: block;
        font-weight: 400;
      }
    }
  }
  .right {
    .icon {
      width: 32px;
      height: 32px;
      padding: 3px;
      fill: #fff;
      background: #bd9f6f;
      border-radius: 50%;
      margin-right: 8px;
    }
  }
}

/*  头部与正文的分隔  */
#separator {
  position: relative;
  height: 26px;
  &::before {
    position: absolute;
    content: "";
    display: inline-block;
    width: 60%;
    height: 26px;
    background: #000;
    transform: skew(45deg);
    left: -13px;
    margin-right: 8px;
    z-index: 0;
  }
  &::after {
    position: absolute;
    content: "";
    display: inline-block;
    width: 41%;
    height: 22px;
    background: #bd9f6f;
    transform: skew(45deg);
    right: -11px;
    bottom: 0;
  }
}

/* 简历正文 */
#resume-content {
  margin: 32px 32px 32px 52px;
  border-left: 1px solid;
}
// 每一项的头部，一样的样式
#resume-content .item-header {
  border-bottom: 1px solid;
  .wrapper {
    transform: skewX(45deg);
    display: inline-block;
    background: #292929;
    padding-right: 45px;
    position: relative;
    left: 18px;
    &::before {
      content: "";
      position: absolute;
      left: -35px;
      background: #292929;
      display: inline-block;
      height: 32px;
      width: 56px;
      transform: skewX(-45deg);
    }
    &::after {
      content: "";
      position: absolute;
      //border: 1px solid red;
      background: #292929;
      height: 20px;
      width: 8px;
      left: -46px;
      top: 21px;
      transform: skew(-45deg, 45deg);
    }
    .title {
      display: inline-block;
      position: relative;
      transform: skewX(-45deg);
      color: #fff;
      font-size: 18px;
      height: 30px;
      line-height: 30px;
      &::before,
      &::after {
        position: absolute;
        content: "";
        display: inline-block;
        height: 100%;
        border-right: 3px solid #ccc;
        transform: skewX(45deg);
        top: 0;
      }
      &::before {
        right: -26px;
      }
      &::after {
        right: -36px;
      }
    }
  }
}
// 每一项的内容
#resume-content section {
  .details {
    padding: 12px 16px;
  }
  .profile {
    display: flex;
    flex-wrap: wrap;
    padding-right: 0px;
    > li {
      min-width: 50%;
    }
  }
  .education {
    padding-right: 42px;
    display: flex;
    justify-content: space-between;
  }
  .project,
  .work-history {
    white-space: pre-line; // 合并连续的换行符，但是会正确的显示换行符
    div + div {
      margin-top: 16px;
    }
  }

  .work-history {
    h4 {
      display: flex;
      justify-content: space-between;
    }
  }
  .skill {
    li {
      list-style-type: disc;
      list-style-position: inside;
      line-height: 1.5;
    }
  }
}
</style>
