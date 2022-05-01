import React from "react";
import './index.css'
import PageTitle from "../../component/page-title/index.jsx";
import $ from 'jquery'

class Download extends React.Component {
  constructor(props) {
    super(props);
  }

  get () {
      let location = {
        'topleft': 123.1232,
        'topright': 123.2323,
        'btmleft': 12.3123,
        'btmright': 45.1231
      }
      location = JSON.stringify(location)
      $.ajax({
        url: '/meta/search/objects',
        type: 'get'
      }).then((res) => {
        console.log(res)
      })
    }

  render() {
    return (
      <div id='page-wrapper'>
        <PageTitle title='下载文件'>
          <button className='btn btn-warning'>123</button>
        </PageTitle>
        <button onClick={() => this.get()}>下载</button>
      </div>
    )
  }
}

export default Download
