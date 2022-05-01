import React from "react";
import {Link, NavLink} from "react-router-dom";

class NavSide extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="navbar-default navbar-side" role="navigation">
        <div className="sidebar-collapse">
          <ul className="nav">
            <li>
              <NavLink exact activeClassName='active-menu' to='/'>
                <i className="fa fa-edit" />
                <span>文件预览</span>
              </NavLink>
            </li>
            <li className='active'>
              <Link to='/change/upload'>
                <i className="fa fa-sitemap" />
                <span>数据变更</span>
                <span className="fa arrow" />
              </Link>
              <ul className="nav nav-second-level collapse in">
                <li>
                  <NavLink activeClassName='active-menu' to='/change/upload'>上传</NavLink>
                </li>
                <li>
                  <NavLink activeClassName='active-menu' to='/change/download'>下载</NavLink>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to='/map' activeClassName='active-menu'>
                <i className="fa fa-map" />
                <span>地图</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default NavSide
