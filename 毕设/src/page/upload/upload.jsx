import React from "react";
import './index.css'
import {Base64} from "js-base64";
import MUtil from 'util/mm.jsx'
const _mm = new MUtil()


class UploadControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      fileList: [],
      postFiles: []
    };
  }

  handleCancel() {
    this.setState({previewVisible: false});
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  async handlePreview(file) {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  }

  handleChange({fileList}) {
    this.setState({fileList: fileList});
  }

  strToBinary(str){
    let result = '';
    const list = str.split("");
    for(let i=0; i<list.length; i++){
      const item = list[i];
      const binaryStr = item.charCodeAt().toString(2);
      result += binaryStr
    }
    return result
  }

  // 垃圾代码
  // const that = this
  // console.log(e.target.files[0])
  // // this.parseFile(e.target.files[0], (e) => {
  // //   console.log(e)
  // // })
  // const files = e.target.files[0]
  // const fileReads = new FileReader()
  // fileReads.readAsArrayBuffer(files)
  // fileReads.onload = function () {
  //   const wordArray = CryptoJS.lib.WordArray.create(fileReads.result)
  //   const hash = CryptoJS.SHA256(wordArray).toString()
  //   const base64 = Base64.encode(hash)
  //   console.log(hash)
  //   console.log(base64)
  //   that.setState({file: files, fileName: files.name, base64: base64})
  // }
  // that.setState({file: files, fileName: files.name})

  inputChange(e) {
    let files = e.target.files
    let i, workers, worker, cryptoAlgos
    for (i = 0; i < files.length; i += 1) {
      let currentFile = files[i];
      workers = [];
      cryptoAlgos = []; // 内置加密 集合
      //线程文件(这是我的文件路径哈，别直接粘贴复制)
      worker = new Worker('../../utils/computer.js', { type: 'module' });
      worker.addEventListener('message', this.handleWorkerEvent(currentFile));
      workers.push(worker);
      //开始分段
      this.hashFile(currentFile, workers);
      console.log(currentFile)
    }

  }

  hashFile(file, workers){
    let i, bufferSize, block, threads, reader, blob, handleHashBlock, handleLoadBlock;
    bufferSize = 64 * 16 * 102400; // 块大小默认 1M
    block = {
      'file_size' : file.size,
      'start' : 0
    };
    block.end = bufferSize > file.size ? file.size : bufferSize; // 源文件大小和块的单位大小对比 取小者
    threads = 0; // 线程数
    for (i = 0; i < workers.length; i += 1) {
    // 监听多线程文件computer.js传过来的信息，每完成一次计算都通信告诉列表继续文件分块
      workers[i].addEventListener('message', handleHashBlock);
    }
    reader = new FileReader();
    //读取完后执行的函数：把读取完成的结果通信给线程文件computer.js，
    reader.onload = handleLoadBlock;
    blob = file.slice(block.start, block.end);
    block.end = bufferSize > file.size ? file.size : bufferSize; // 源文件大小和块的单位大小对比 取小者
    //开始读取分块
    reader.readAsArrayBuffer(blob); 
    handleLoadBlock = (event)=> {
      for( i = 0; i < workers.length; i += 1) {
        threads += 1;
        workers[i].postMessage({
          'message' : event.target.result,
          'block' : block
        });
      }
    }
    
    handleHashBlock = (event)=> {
      threads -= 1;
      if(threads === 0) {
        if(block.end !== file.size) {
          block.start += bufferSize;
          block.end += bufferSize;
          if(block.end > file.size) {
            block.end = file.size;
          }
          reader = new FileReader();
          reader.onload = handleLoadBlock;
          blob = file.slice(block.start, block.end);
          reader.readAsArrayBuffer(blob);
        }
      }
    }
  }

  handleWorkerEvent() {
    return (event)=> {
      if (event.data.result) {
        this.fileDigestResult = event.data.result;
        console.log('计算结果为---------------:'+this.fileDigestResult)
      } else {
        console.log('当前进度-----:',(event.data.block.end * 100 / event.data.block.file_size).toFixed(2) + '%')
      }
    };
  }

  put () {
    const {fileName, file, base64} = this.state
    console.log(fileName)
    const url = 'http://101.43.156.185:8080/objects/' + fileName
    let location = [123.1232, 123.2323, 12.3123, 45.1231]
    location = JSON.stringify(location)
    $.ajax({
      url: '/objects/' + fileName,
      type: 'put',
      data: file,
      contentType : false,
      processData : false,
      headers: {'Digest': 'SHA-256=' + base64, 'location': location}
    })
  }

  render() {
    //   const {previewVisible, previewImage, fileList, previewTitle} = this.state;
    //   const uploadButton = (
    //     <div>
    //       <PlusOutlined/>
    //       <div style={{marginTop: 8}}>Upload</div>
    //     </div>
    //   );
    //   console.log(this.state.postFiles)
    //   return (
    //     <div id='page-wrapper'>
    //       <PageTitle title='上传文件'/>
    //       <Upload
    //         // action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
    //         listType="picture-card"
    //         fileList={fileList}
    //         onPreview={(e) => this.handlePreview(e)}
    //         onChange={(e) => this.handleChange(e)}
    //       >
    //         {fileList.length >= 8 ? null : uploadButton}
    //       </Upload>
    //       <Modal
    //         visible={previewVisible}
    //         title={previewTitle}
    //         footer={null}
    //         onCancel={(e) => this.handleCancel(e)}
    //       >
    //         <img alt="example" style={{width: '100%'}} src={previewImage}/>
    //       </Modal>
    //     </div>
    //   )
    return (
      <form id='formId'>
        <label>上传图像</label>
        <input type="file" onChange={e => this.inputChange(e)}/>
        <button type='button' onClick={() => this.put()}>上传</button>
      </form>
    )
  }
}

export default UploadControl
