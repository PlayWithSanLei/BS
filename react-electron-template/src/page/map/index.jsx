import React from "react";
import './index.css'
import PageTitle from "../../component/page-title/index.jsx";
import { Card } from 'antd'

class Map extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id='page-wrapper'>
        <PageTitle title='地图预览' />
        <Card style={{height: '93%'}}>
          <iframe
            allowfullscreen="true"
            width="100%"
            title='山西遥感图'
            height="100%"
            src="http://127.0.0.1:9427/edu">
          </iframe>
        </Card>
      </div>
    )
  }
}

export default Map
