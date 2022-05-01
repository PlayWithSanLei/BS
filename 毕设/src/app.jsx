import React from "react";
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'

// 页面
import Home from 'page/home/index.jsx';
import Layout from "component/layout/index.jsx";
import Login from "page/login/index.jsx";
import ErrorPage from 'page/404/Error.jsx'
import UploadControl from "page/upload/upload.jsx";
import Download from "page/download/download.jsx";
import Map from "page//map/index.jsx";

class App extends React.Component {
  render() {
    let layoutRouter = (
      <Layout>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/change/upload' component={UploadControl}/>
          <Route path='/change/download' component={Download}/>
          <Route path='/map' component={Map}/>
          <Route component={ErrorPage}/>
        </Switch>
      </Layout>
    )
    return (
      <Router>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/' render={(props) => layoutRouter}/>
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
)
