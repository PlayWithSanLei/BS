import React, {Component} from "react";
import {Route, Redirect} from "react-router-dom";

class FrontendAuth extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {routerConfig, location} = this.props
    const {pathname} = location
    const isLogin = localStorage.getItem('userInfo')
    const targetRouterConfig = routerConfig.find(
      item => item.path === pathname
    )
    if (targetRouterConfig && !targetRouterConfig.auth && !isLogin) {
      const {component} = targetRouterConfig
      return <Route exact path={pathname} component={component}/>
    }
    if (isLogin) {
      if (pathname === '/login') {
        return <Redirect to='/'/>
      } else {
        if (targetRouterConfig) {
          return (
            <Route path={pathname} component={targetRouterConfig.component}/>
          )
        } else {
          return <Redirect to={'/error'} />
        }
      }
    } else {
      if (targetRouterConfig && targetRouterConfig.auth) {
        return <Redirect to='/login'/>
      } else {
        return <Redirect to='/error'/>
      }
    }
  }
}

export default FrontendAuth
