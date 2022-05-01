import './App.css';
import 'easymde/dist/easymde.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import FileSearch from "./components/FileSearch";
import SimpleMde from "react-simplemde-editor";
import {faFileImport, faPlus} from "@fortawesome/free-solid-svg-icons";
import FileList from "./components/FileList";
import defaultFiles from "./utils/defaultFiles";
import BottomBtn from "./components/BottomBtn";
import TabList from "./components/TabList";
import {useMemo, useState} from "react";
import {v4 as uuidv4} from "uuid";
import * as marked from 'marked'
import {flattenArr, objToArr} from './utils/helper'

function App() {
  // const [files, setFiles] = useState(flattenArr(defaultFiles))
  // console.log(files)
  // const [activeFileID, setActiveFileID] = useState('')
  // const [openedFileIDs, setOpenedFileIDs] = useState([])
  // const [unsavedFileIDs, setUnsavedFileIDs] = useState([])
  // const [searchedFiles, setSearchedFiles] = useState([])
  // const filesArr = objToArr(files)
  // console.log(filesArr)
  //
  // const openedFiles = openedFileIDs.map(openID => {
  //   return files[openID]
  // })
  // const activeFile = files[activeFileID]
  // const fileClick = (fileID) => {
  //   // set current active file
  //   setActiveFileID(fileID)
  //   // if openedFile don't have the current ID
  //   if (!openedFileIDs.includes(fileID)) {
  //     // add new fileID to openedFiles
  //     setOpenedFileIDs([...openedFileIDs, fileID])
  //   }
  // }
  //
  // const tabClick = (fileID) => {
  //   setActiveFileID(fileID)
  // }
  //
  // const tabClose = (id) => {
  //   const tabsWithout = openedFileIDs.filter(fileID => {
  //     return fileID !== id
  //   })
  //   setOpenedFileIDs(tabsWithout)
  //   if (tabsWithout.length > 0) {
  //     setActiveFileID(tabsWithout[tabsWithout.length - 1])
  //   } else {
  //     setActiveFileID([])
  //   }
  // }
  //
  // const fileChange = (id, value) => {
  //   const newFile = {...files[id], body: value}
  //   setFiles({...files, [id]: newFile})
  //   if (!unsavedFileIDs.includes(id)) {
  //     setUnsavedFileIDs([...unsavedFileIDs, id])
  //   }
  // }
  //
  // const mdOptions = useMemo(() => {
  //   return {
  //     autofocus: true,
  //     minHeight: '688px',
  //     previewRender: (plainText, preview) => { // Async method
  //       setTimeout(() => {
  //         preview.innerHTML = marked.parse(plainText);
  //       }, 0);
  //
  //       return "Loading...";
  //     },
  //   }
  // }, [])
  //
  // const deleteFile = (id) => {
  //   delete files[id]
  //   setFiles(files)
  //   tabClose(id)
  // }
  //
  // const updateFileName = (id, title) => {
  //   const modifiedFile = {...files[id], title, isNew: false}
  //   setFiles({...files, [id]: modifiedFile})
  // }
  //
  // const fileSearch = (keyword) => {
  //   const newFiles = filesArr.filter(file => file.title.includes(keyword))
  //   setSearchedFiles(newFiles)
  // }
  //
  // const fileListArr = (searchedFiles.length > 0) ? searchedFiles : filesArr
  //
  // const createNewFile = () => {
  //   const newID = uuidv4()
  //   const newFile = {
  //     id: newID,
  //     title: '',
  //     body: '## 请输入Markdown',
  //     createAt: new Date().getTime(),
  //     isNew: true
  //   }
  //   setFiles({...files, [newID]: newFile})
  // }
  //
  // return (
  //   <div className="App container-fluid">
  //     <div className='row'>
  //       <div className="col-3 bg-light left-panel">
  //         <FileSearch
  //           title='我的云文档'
  //           onFileSearch={fileSearch}
  //         />
  //         <FileList
  //           files={fileListArr}
  //           onFileClick={fileClick
  //           }
  //           onFileDelete={deleteFile}
  //           onSaveEdit={updateFileName}
  //         />
  //         <div className='bottom-btn'>
  //           <div className='btn-block'>
  //             <BottomBtn
  //               text='新建'
  //               colorClass='btn-primary'
  //               icon={faPlus}
  //               onBtnClick={createNewFile}
  //             />
  //           </div>
  //           <div className='btn-block'>
  //             <BottomBtn
  //               text='导入'
  //               colorClass='btn-success'
  //               icon={faFileImport}
  //             />
  //           </div>
  //         </div>
  //       </div>
  //       <div className="col-9 right-panel">
  //         {!activeFile &&
  //         <div className='start-page'>
  //           选择或者创建新的Markdown文档
  //         </div>
  //         }
  //         {activeFile &&
  //         <>
  //           <TabList
  //             files={openedFiles}
  //             onTabClick={tabClick}
  //             activeId={activeFileID}
  //             unSaveIds={unsavedFileIDs}
  //             onCloseTab={tabClose}
  //           />
  //           <SimpleMde
  //             value={activeFile?.body}
  //             onChange={value => {
  //               fileChange(activeFile.id, value)
  //             }}
  //             options={mdOptions}
  //           />
  //         </>
  //         }
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <iframe src='http://localhost:8080/login' style={{width: '100%', height: '100%'}}/>
  )
}

export default App;
