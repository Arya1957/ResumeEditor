import AV from './leancloud.js'

export default function() {
  let AVUser = AV.User.current();
  if (AVUser) {
    let {id, attributes: {username}} = AVUser;
    return { id, username}
  } else {
    return {id: '',username: ''}
  }

}
