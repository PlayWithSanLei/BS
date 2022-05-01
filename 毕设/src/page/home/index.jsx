import React from "react";
import './index.css'
import PageTitle from "component/page-title/index.jsx";
import MyImage from "component/image/index.jsx";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div id='page-wrapper'>
        <MyImage/>
      </div>
    )
  }
}

export default Home
