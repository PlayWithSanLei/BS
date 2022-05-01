import React from "react";
import {Link} from "react-router-dom";
import MUtil from "../../util/mm.jsx";
import User from "../../service/user-service.jsx";

const _mm = new MUtil()
const _user = new User()

class NavTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: _mm.getStorage('userInfo').username || ''
    }
  }

  render() {
    return (
      <div className="navbar navbar-default top-navbar" role="navigation">
        <div className="navbar-header">
          <Link to='/' className="navbar-brand">&nbsp;&nbsp;<b>遥感</b>&nbsp;●&nbsp;<span>私有云</span></Link>
        </div>

        <ul className="nav navbar-top-links navbar-right">
          <li className="dropdown">
            <a className="dropdown-toggle" href="javascript:;">
              <i className="fa fa-user fa-fw"></i>
              {this.state.username
                ? <span>欢迎您, {this.state.username}</span>
                : <span>你谁呀</span>
              }
              <i className="fa fa-caret-down"></i>
            </a>
            <ul className="dropdown-menu dropdown-user">
              <li>
                <a onClick={() => {this.onLogout()}}>
                    <i className="fa fa-sign-out fa-fw"></i>
                  <Link to='/login'>
                    登出
                  </Link>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }

  onLogout() {
    _user.logout().then(res => {
      _mm.removeStorage('userInfo')
      window.location.href = '/login'
    }, errMsg => {
      _mm.errorTips(errMsg)
    })
  }
}

export default NavTop
