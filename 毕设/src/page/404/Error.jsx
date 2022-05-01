import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import {Link} from 'react-router-dom';

class Error extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id='page-wrapper'>
        <PageTitle title='出错啦！'/>
        <div className="row" style={{marginTop: '30px'}}>
          <div className="col-md-12">
            <span>页面被狗狗叼走啦～～～</span>
            <Link to='/'>点我返回首页</Link>
          </div>
        </div>

      </div>
    )
  }
}

export default Error;
