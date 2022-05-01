import MUtil from '../util/mm.jsx'
import $ from 'jquery'
const _mm = new MUtil()

class User {
  login(loginInfo) {
    return _mm.request({
        type: 'post',
        url: 'http://admintest.happymmall.com/manage/user/login.do',
        data: loginInfo
      }
    )
  }

  logout() {
    return _mm.request({
      type: 'post',
      url: '/user/logout.do'
    })
  }

  checkLoginInfo(loginInfo) {
    let username = $.trim(loginInfo.username)
    let password = $.trim(loginInfo.password)
    if (typeof username !== 'string' || username.length === 0) {
      return {
        status: false,
        msg: '用户名为空!'
      }
    }
    if (typeof password !== 'string' || password.length === 0) {
      return {
        status: false,
        msg: '密码为空!'
      }
    }
    return {
      status: true,
      msg: '验证成功!'
    }
  }
}

export default User
