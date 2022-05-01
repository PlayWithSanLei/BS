import React from "react";
import './index.css'
import PageTitle from "../../component/page-title/index.jsx";
import MyImage from "../../component/image/index.jsx";
import Query from "../../component/query";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div id='page-wrapper'>
        <PageTitle title='我的文件' />
        <Query />
        <MyImage/>
      </div>
    )
  }
}

export default Home
