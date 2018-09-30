import Vuex from 'vuex'
import Vue from 'vue'
import objectPath from "object-path"
import AV from '../lib/leancloud.js'
import getErrorMessage from '../lib/getErrorMessage.js'


Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    user: {
      username: '',
      password: '',
      id: ''
    },
    dataSaved: true, // 检测数据是否保存
    saveSuccess: false,
    saveError: false,
    selected: 'profile',
    titles: {
      profile: '基本信息',
      education: '教育背景',
      project: '项目经历',
      workHistory: '工作经历',
      skill: '技能',
      evaluation: '自我评价'
    },
    labels: {
      name: '姓名',
      address: '地址 （选填）',
      degree: '学历',
      jobIntention: '求职意向',
      GitHub: 'GitHub （选填）',
      blog: '博客 （选填）',
      duration: '时间',
      school: '学校',
      major: '专业',
      projectName: '项目名称',
      projectIntro: '项目介绍',
      company: '公司',
      content: '工作内容',
      skillName: '技能',
      QQ: 'QQ （选填）',
      WeChat: '微信 （选填)',
      Phone: '联系电话',
      eMail: '邮箱',
      evaluation: '自我评价'
    },

    resume: {
      config: [
        {title: 'profile', icon: 'profile'},
        {title: 'education', icon: 'education'},
        {title: 'project', icon: 'project'},
        {title: 'workHistory', icon: 'workHistory'},
        {title: 'skill', icon: 'skill'},
        {title: 'evaluation', icon: 'write'}
       
      ],
      profile: {
        name: '念念',
        degree: '本科',
        jobIntention: '前端开发工程师',
        Phone: 'xxxxxxxx',
        eMail: '1969563716@qq.com',
        QQ: '',
        WeChat: '15927496463',
        GitHub: 'https://arya1957.github.io/blog/list.html',
        blog: 'https://www.jianshu.com/u/437babbccf99',
        address: ''
      },
      education: [
        {duration: 'xxxx ~ xxxx', school: 'xx大学', major: 'xx专业'}
      ],
      project: [
        {projectName: 'xxxx', projectIntro: '详细描述你的职责范围、任务及取得的成绩，工作经验的时间采取倒叙形式，最近经历写在前面，描述尽量具体简洁，工作经验的描述与目标岗位的招聘要求尽量匹配，用词精准。'},
      ],
      workHistory: [
        {duration: 'xxxx ~ xxxx', company: 'ABC company', job: 'web 前端开发', content: '详细描述你的职责范围、工作任务及取得的成绩，工作经验的时间采取倒叙形式，最近经历写在前面，描述尽量具体简洁，工作经验的描述与目标岗位的招聘要求尽量匹配，用词精准。'},
        {duration: 'xxxx ~ xxxx', company: 'DEF company', job: 'web 前端开发', content: '详细描述你的职责范围、工作任务及取得的成绩，工作经验的时间采取倒叙形式，最近经历写在前面，描述尽量具体简洁，工作经验的描述与目标岗位的招聘要求尽量匹配，用词精准。'}
      ],
      skill: [
        {skillName: 'xxxxxxxxxxx'},
        {skillName: 'xxxxxxxxxxx'}
      ],
      evaluation: [
        {evaluation: '篇幅不要太长，注意结合简历整体的美观度，如果真的有很多话要说，建议以求职信的形式附上。自我评价应做到突出自身符合目标岗位要求的“卖点”，避免过多使用形容词，而应该通过数据及实例来对自身价值进行深化。'}
      ]
    }

  },
  mutations: {
    setUser(state, user) {
      Object.assign(state.user, user);

      //   localStorage.setItem('data', JSON.stringify(state))
    },
    removeUser(state) {
      state.user.id = '';
      state.dataSaved = true;
      state.resume =  {
        config: [
          {title: 'profile', icon: 'profile'},
          {title: 'education', icon: 'education'},
          {title: 'project', icon: 'project'},
          {title: 'workHistory', icon: 'workHistory'},
          {title: 'skill', icon: 'skill'},
          {title: 'evaluation', icon: 'write'}
         
        ],
        profile: {
          name: '念念',
          degree: '本科',
          jobIntention: '前端开发工程师',
          Phone: 'xxxxxxxx',
          eMail: '1969563716@qq.com',
          QQ: '',
          WeChat: '15927496463',
          GitHub: 'https://arya1957.github.io/blog/list.html',
          blog: 'https://www.jianshu.com/u/437babbccf99',
          address: ''
        },
        education: [
          {duration: 'xxxx ~ xxxx', school: 'xx大学', major: 'xxxx'}
        ],
        project: [
          {projectName: 'xxxx', projectIntro: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'},
        ],
        workHistory: [
          {duration: 'xxxx ~ xxxx', company: 'ABC company', job: 'web 前端开发', content: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'},
          {duration: 'xxxx ~ xxxx', company: 'DEF company', job: 'web 前端开发', content: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'}
        ],
        skill: [
          {skillName: 'xxxxxxxxxxx'},
          {skillName: 'xxxxxxxxxxx'}
        ],
        evaluation: [
          {evaluation: 'xxxxxxx'}
        ]
      }
     
     // localStorage.setItem('state', JSON.stringify(state));
    },
    setResume(state, {id, resume}) {
      state.resume.id = id;
      console.log(state.resume)
      console.log(resume)

      Object.assign(state.resume, resume);
      //    localStorage.setItem('state', JSON.stringify(state));
    },
    switchTab(state, payload) {
      state.selected = payload;
      //   localStorage.setItem('state', JSON.stringify(state));
    },

    updateContent(state, {path, value}) {
      objectPath.set(state.resume, path, value);
      state.dataSaved = false
      //  localStorage.setItem('state', JSON.stringify(state));
    },
    addItem(state, path) {
      let keys = Object.keys(state.resume[path][0]);
      let temp = {};
      keys.map(key => temp[key] = '');
      state.resume[path].push(temp);
      //  state.dataSaved = false

      //   localStorage.setItem('state', JSON.stringify(state))
    },
    removeItem(state, {path, index}) {
      state.resume[path].splice(index, 1);
      //   state.dataSaved = false

      //   objectPath.del(state.resume,[path,index])
      //   localStorage.setItem('state', JSON.stringify(state))
    }

  },
  actions: {
    createResume({state, commit, dispatch}) {
      let dataStr = JSON.stringify(state.resume);
      let Resume = AV.Object.extend("Resume"); // 新建对象
      let resume = new Resume(); // 设置名称
      resume.set("resume", dataStr); // dataStr 就是我们要保存的数据
      let acl = new AV.ACL();
      acl.setReadAccess(AV.User.current(), true); // 只有这个用户可读
      acl.setWriteAccess(AV.User.current(), true); // 只有这个用户可写
      resume.setACL(acl);  // 将 ACL 实例赋予 resume 对象， 添加访问控制
      resume.save().then(function (resume) {
          state.dataSaved = true;
     //     console.log('这是创建简历');
          let resumeData = JSON.parse(resume.attributes.resume);
          let id = resumes.id;
          commit('setResume', {id, resumeData});
          dispatch('saveSuccess');
        }, () => dispatch('saveError')
      )
    },
    updateResume({state, commit, dispatch}) {
      //  console.log(state.resume.id);
      let resume = AV.Object.createWithoutData('Resume', state.resume.id);
      let dataStr = JSON.stringify(state.resume);
      resume.set('resume', dataStr);
      resume.save().then((resume) => {
          state.dataSaved = true;
       //   console.log('这是更新简历');
          let resumeData = JSON.parse(resume.attributes.resume);
          let id = resume.id;
          commit('setResume', {id, resumeData});
          dispatch('saveSuccess');
        }, () => dispatch('saveError')
      )

    },
    createOrUpdateResume({dispatch, state}) {
      let resumeId = state.resume.id;
      if (resumeId) {
        dispatch('updateResume')
      } else {
        dispatch('createResume')
      }
    },
    fetchResume({state, commit}) {
      let query = new AV.Query('Resume');

      query.find().then((resumes) => {
        if (resumes) {

          let resume = JSON.parse(resumes[0].attributes.resume);
          let id = resumes[0].id;

          commit('setResume', {id, resume});
        }
      }, () => dispatch('saveError'))
    },
    saveSuccess({state}) {
      state.saveSuccess = true;
      setTimeout(() => state.saveSuccess = false, 2000)
    },
    saveError({state}) {
      state.saveError = true;
      setTimeout(() => state.saveError = false, 2000)
    }

  }
});

// object-path  test
// let obj = {
//   a: {
//     b: "d",
//     c: ["e", "f"],
//     '\u1200': 'unicode key',
//     'dot.dot': 'key',
//     test1: [{name: 'xxx1',content: 'test1'},{name: 'xxx2',content: 'test2'}],
//     test2: {key:'abc', value: 'sss'}
//   }
// };
// objectPath.set(obj, "a.test1.1.name", "newName"); // 更新 test1 的第二个对象name的value
// objectPath.set(obj,"a.test2.key","newKey"); //
// console.log(obj);
// objectPath.push(obj, "a.test1", "{name:'',content:''}");
// console.log(obj);
// objectPath.del(obj,["a","test1",0]);
// console.log(obj);


