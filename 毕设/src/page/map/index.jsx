import React from "react";
import './index.css'
import PageTitle from "component/page-title/index.jsx";

class Map extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id='page-wrapper'>
        <PageTitle title='地图预览'/>
      </div>
    )
  }
}

export default Map
