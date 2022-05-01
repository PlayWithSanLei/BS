import React, {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTimes, faTrash} from "@fortawesome/free-solid-svg-icons";
import {faMarkdown} from "@fortawesome/free-brands-svg-icons";
import PropTypes from 'prop-types';
import useKeyPress from "../hooks/useKeyPress";

const FileList = ({files, onFileClick, onSaveEdit, onFileDelete}) => {
  const [editStatus, setEditStatus] = useState(false)
  const [value, setValue] = useState('')
  const enterPressed = useKeyPress(13)
  const escPressed = useKeyPress(27)

  const closeSearch = (editItem) => {
    setEditStatus(false)
    setValue('')
    if (editItem.isNew) {
      onFileDelete(editItem.id)
    }
  }
  let node = useRef(null)

  useEffect(() => {
    const editItem = files.find(file => file.id === editStatus)
    if (enterPressed && editStatus && value.trim() !== '') {
      onSaveEdit(editItem.id, value)
      setEditStatus(false)
      setValue('')
    }
    if (escPressed && editStatus) {
      closeSearch(editItem)
    }
  })

  useEffect(() => {
    const newFile = files.find(file => file.isNew)
    console.log(newFile)
    if (newFile) {
      setEditStatus(newFile.id)
      setValue(newFile.title)
    }
  }, [files])

  useEffect(() => {
    if (editStatus) {
      node?.current?.focus()
    }
  }, [editStatus])

  return (
    <div style={{overflow: 'auto', maxHeight: '78.7vh'}}>
      <ul className='list-group list-group-flush file-list'>
        {
          files.map(file => (
            <li
              className='list-group-item bg-light row d-flex align-items-center file-item'
              key={file.id}
            > {((file.id !== editStatus) && !file.isNew) ?
              <>
            <span className='col-2'>
            <FontAwesomeIcon icon={faMarkdown} size='lg'/>
            </span>
                <span className='col-7 c-link file-title' onClick={() => {
                  onFileClick(file.id)
                }}>{file.title}</span>
                <button type='button' className='icon-button col-1' onClick={() => {
                  setEditStatus(file.id);
                  setValue(file.title)
                }}><FontAwesomeIcon icon={faEdit} size='lg'/></button>
                <button type='button' className='icon-button col-1' style={{transform: 'translateX(20px)', padding: 0}} onClick={() => {
                  onFileDelete(file.id)
                }}><FontAwesomeIcon icon={faTrash} size='lg'/></button>
              </> :
              <div className='d-flex justify-content-between align-items-center'>
                <div style={{display: 'inline-block', width: '90%'}}>
                  <input type="text" className='form-control' value={value} onChange={(e) => {
                    setValue(e.target.value)
                  }} ref={node} placeholder='请输入文件名'/>
                </div>
                <button type='button' className='icon-button' onClick={() => {
                  closeSearch(file)
                }}>
                  <FontAwesomeIcon icon={faTimes} title='关闭' size='lg'/>
                </button>
              </div>
            }
            </li>
          ))
        }
      </ul>
    </div>
  )
}

FileList.propTypes = {
  files: PropTypes.array,
  onFileClick: PropTypes.func,
  onFileDelete: PropTypes.func,
  onSaveEdit: PropTypes.func
}

export default FileList
