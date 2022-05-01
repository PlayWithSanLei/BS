import React from 'react'
import PropTypes from 'prop-types'
import classNames from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import './TabList.scss'

const TabList = ({files, activeId, unSaveIds, onTabClick, onCloseTab}) => {
  return (
    <ul className='nav nav-pills tabList-component'>
      {files.map(file => {
        const withUnSaveMark = unSaveIds.includes(file.id)
        const fClassName = classNames({
          'nav-link': true,
          'active': file.id === activeId,
          'withUnsaved': withUnSaveMark
        })
        return (
          <li className='nav-item' key={file.id}>
            <a
              href='#'
              className={fClassName}
              onClick={(e) => {
                e.preventDefault();
                onTabClick(file.id)
              }}
            >
              {file.title}
              <span className='close-icon'
              onClick={(e) => {e.stopPropagation(); onCloseTab(file.id)}}>
                <FontAwesomeIcon icon={faTimes}/>
              </span>
              {withUnSaveMark && <span className='rounded-circle unsaved-icon'/>}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

TabList.propTypes = {
  files: PropTypes.array,
  activeId: PropTypes.string,
  unSaveIds: PropTypes.array,
  onTabClick: PropTypes.func,
  onCLoseTab: PropTypes.func,
}
TabList.defaultProps = {
  unSaveIds: []
}
export default TabList
