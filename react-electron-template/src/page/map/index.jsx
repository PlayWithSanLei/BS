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
        <Card>
          <iframe id="inlineFrameExample"
            title="Inline Frame Example"
            width="435"
            height="500"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik">
          </iframe>
        </Card>
      </div>
    )
  }
}

export default Map
