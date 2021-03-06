import React from "react";
import './index.css'
import User from '../../service/user-service.jsx'
import MUtil from "../../util/mm.jsx";

const _user = new User()
const _mm = new MUtil()

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirect: _mm.getUrlParam('redirect') || '/',
      signup: '/signup'
    }
  }

  componentDidMount() {
    document.title = '登录-YGY'
  }

  onInputChange(e) {
    let inputName = e.target.name
    let inputValue = e.target.value
    this.setState({[inputName]: inputValue})
  }

  localCheck (loginInfo) {
    const infos = _mm.getStorage('userInfos') || {}
    if (infos.hasOwnProperty(loginInfo.username)) {
      if (infos[loginInfo.username] === loginInfo.password) {
        return true
      }
    }
    return false
  }

  onSubmit() {
    let loginInfo = {
      username: this.state.username,
      password: this.state.password
    }
    if (this.localCheck(loginInfo)) {
      this.props.history.push(this.state.redirect)
      _mm.setStorage('username', loginInfo.username)
      return 
    }
    let checkResult = _user.checkLoginInfo(loginInfo)
    checkResult.status ? _user.login(loginInfo).then(res => {
      _mm.setStorage('userInfo', res)
      this.props.history.push(this.state.redirect)
    }, (errMsg) => {
      _mm.errorTips(errMsg)
    }) : _mm.errorTips(checkResult.msg)
  }

  onInputKeyup(e) {
    if (e.keyCode === 13) {
      this.onSubmit();
    }
  }

  onSignup (e) {
    this.props.history.push(this.state.signup)
  }

  render() {
    return (
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default login-panel">
          <div className="panel-heading">欢迎登录 - 遥感云</div>
          <div className="panel-body">
            <div>
              <div className="form-group">
                <label>用户名</label>
                <input type="email" className="form-control" placeholder="UserName" name='username'
                       onChange={e => this.onInputChange(e)} onKeyUp={e => this.onInputKeyup(e)}
                />
              </div>
              <div className="form-group">
                <label>密码</label>
                <input type="password" className="form-control" placeholder="Password" name='password'
                       onChange={e => this.onInputChange(e)} onKeyUp={e => this.onInputKeyup(e)}
                />
              </div>
              <div className='button-panel'>
                <button className="btn btn-primary" name='signup' onClick={e => this.onSignup(e)}>注册</button>
                <button className="btn btn-warning" name='login' onClick={e => this.onSubmit(e)}>登录</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
