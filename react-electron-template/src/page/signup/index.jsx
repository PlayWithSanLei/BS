import React from "react";
import './index.css'
import MUtil from "../../util/mm.jsx";

const _mm = new MUtil()

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      repassword: '',
      redirect: _mm.getUrlParam('redirect') || '/'
    }
  }

  componentDidMount() {
    document.title = '注册-YGY'
  }

  onInputChange(e) {
    let inputName = e.target.name
    let inputValue = e.target.value
    this.setState({[inputName]: inputValue})
  }

  back () {
      this.props.history.push('/login')
  }

  onSubmit() {
    let loginInfo = {
      username: this.state.username,
      password: this.state.password,
      repassword: this.state.repassword
    }
    if (loginInfo.username == '') {
        alert('用户名不能为空')
        return
    } else if (loginInfo.password == '') {
        alert('密码不能为空')
        return
    } else if (loginInfo.repassword == '') {
        alert('确认密码不能为空')
        return
    } else if (loginInfo.password !== loginInfo.repassword) {
        alert('两次密码输入不一致')
        return
    }
    this.props.history.push('/login')
    const userInfos = _mm.getStorage('userInfos') || {}
    userInfos[loginInfo.username] = loginInfo.password
    _mm.setStorage('userInfos', userInfos)
    _mm.setStorage('userName', loginInfo.username)
    alert('注册成功，请登录！')
  }

  onInputKeyup(e) {
    if (e.keyCode === 13) {
      this.onSubmit();
    }
  }

  render() {
    return (
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default login-panel">
          <div className="panel-heading">注册用户 - 遥感云</div>
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
              <div className="form-group">
                <label>确认密码</label>
                <input type="password" className="form-control" placeholder="RePassword" name='repassword'
                       onChange={e => this.onInputChange(e)} onKeyUp={e => this.onInputKeyup(e)}
                />
              </div>
              <div className='button-panel'>
                <button className="btn" name='login' onClick={e => this.back(e)}>返回</button>
                <button className="btn btn-warning" name='login' onClick={e => this.onSubmit(e)}>注册</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Signup
