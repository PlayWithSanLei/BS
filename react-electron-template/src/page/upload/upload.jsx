import React from "react";
import './index.css'
import MUtil from '../../util/mm.jsx'
import $ from 'jquery'
import PageTitle from "../../component/page-title/index.jsx";
import { Button, Input } from 'antd'
const child_process = window.require('child_process');

const _mm = new MUtil()

class UploadControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      fileList: [],
      postFiles: [],
      location: ''
    };
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


  // 好代码 但是不能用
  // let i, workers, worker, cryptoAlgos
  // for (i = 0; i < files.length; i += 1) {
  //   let currentFile = files[i];
  //   workers = [];
  //   cryptoAlgos = []; // 内置加密 集合
  //   //线程文件(这是我的文件路径哈，别直接粘贴复制)
  //   worker = new Worker('../../util/computer.js', { type: 'module' });
  //   worker.addEventListener('message', this.handleWorkerEvent(currentFile));
  //   workers.push(worker);
  //   //开始分段
  //   this.hashFile(currentFile, workers);
  //   console.log(currentFile)
  // }

  inputChange(e) {
    let files = e.target.files
    for (let i = 0; i < files.length; i++) {
      console.log(files[i].path)
      const fileName = files[i].name
      const filePath = files[i].path
      const file = files[i]
      let args = [filePath]
      let image = document.getElementById('img')
      let put = document.getElementById('put')
      const imageStyle = {
        width: '50px',
        height: '50px'
      }

      let cat = child_process.spawn('cat', args)
      let openssl = child_process.spawn('openssl', ['dgst', '-sha256', '-binary'])
      let base64 = child_process.spawn('base64')
      alert('编码中，请稍后！')
      cat.stdout.pipe(openssl.stdin)
      openssl.stdout.pipe(base64.stdin)
      base64.stdout.on('data', (data) => {
        console.log(`${data}`)
        if (file) {
          const reader = new FileReader()
          reader.addEventListener('load', function () {
            console.log(this.result);
            image.setAttribute('src', this.result)
            image.style.width = '200px'
            image.style.height = '200px'
            image.style.margin = '10px 0'
            image.style.border = '1px solid black'
            put.style.display = 'block'
          });

          reader.readAsDataURL(file);
        }
        this.setState({ file: file, fileName: fileName, base64: data })
        alert('编码完成，请点击上传按钮进行上传！')
      })
    }
  }

  // hashFile(file, workers){
  //   let i, bufferSize, block, threads, reader, blob, handleHashBlock, handleLoadBlock;
  //   bufferSize = 64 * 16 * 102400; // 块大小默认 1M
  //   block = {
  //     'file_size' : file.size,
  //     'start' : 0
  //   };
  //   block.end = bufferSize > file.size ? file.size : bufferSize; // 源文件大小和块的单位大小对比 取小者
  //   threads = 0; // 线程数
  //   for (i = 0; i < workers.length; i += 1) {
  //   // 监听多线程文件computer.js传过来的信息，每完成一次计算都通信告诉列表继续文件分块
  //     workers[i].addEventListener('message', handleHashBlock);
  //   }
  //   reader = new FileReader();
  //   //读取完后执行的函数：把读取完成的结果通信给线程文件computer.js，
  //   reader.onload = (event)=> {
  //     for( i = 0; i < workers.length; i += 1) {
  //       threads += 1;
  //       workers[i].postMessage({
  //         'message' : event.target.result,
  //         'block' : block
  //       });
  //     }
  //   };
  //   blob = file.slice(block.start, block.end);
  //   block.end = bufferSize > file.size ? file.size : bufferSize; // 源文件大小和块的单位大小对比 取小者
  //   //开始读取分块
  //   reader.readAsArrayBuffer(blob); 

  //   handleHashBlock = (event)=> {
  //     threads -= 1;
  //     if(threads === 0) {
  //       if(block.end !== file.size) {
  //         block.start += bufferSize;
  //         block.end += bufferSize;
  //         if(block.end > file.size) {
  //           block.end = file.size;
  //         }
  //         reader = new FileReader();
  //         reader.onload = handleLoadBlock;
  //         blob = file.slice(block.start, block.end);
  //         reader.readAsArrayBuffer(blob);
  //       }
  //     }
  //   }
  // }

  // handleWorkerEvent() {
  //   return (event)=> {
  //     if (event.data.result) {
  //       this.fileDigestResult = event.data.result;
  //       console.log('计算结果为---------------:'+this.fileDigestResult)
  //     } else {
  //       console.log('当前进度-----:',(event.data.block.end * 100 / event.data.block.file_size).toFixed(2) + '%')
  //     }
  //   };
  // }

  put() {
    const { fileName, file, base64, location } = this.state
    alert('上传中，请稍后！')
    // const url = 'http://101.43.156.185:8080/objects/' + fileName
    let loc = location.split(' ')

    loc = JSON.stringify(loc)
    $.ajax({
      url: '/objects/' + fileName,
      type: 'put',
      data: file,
      contentType: false,
      processData: false,
      headers: { 'Digest': 'SHA-256=' + base64, 'location': loc }
    }).then(e => {
      alert('上传成功！')
    }).catch(err => {
      alert(err.statusText)
    })
  }

  handleChange(e) {
    console.log(e.target.value)
    this.setState({ location: e.target.value })
  }

  compress () {
    // 调用python的压缩算法
    child_process.exec('python3 ./public/compress.py', (a, b, c) => {
      console.log('a', a)
      console.log('b', b)
      console.log('c', c)
    })
  }

  render() {
    return (
      <div id='page-wrapper'>
        <PageTitle title='数据上云' />
        <p>上传图像之前您可以选择压缩工具对图像进行压缩，预计将减小50%的体积</p>
        <form id='formId'>
          <Button type='warn' className='btn btn-primary' size='large' onClick={() => this.compress()} style={{marginRight: '8px'}}>压缩工具</Button>
          <input type="file" className="btn btn-warning" onChange={e => this.inputChange(e)} style={{display: 'inline'}} />
          <img id='img' />
          <div id='put' style={{ display: 'none' }}>
            <p>请输入图像的四个角的坐标，分别是(左上 右上 右下 左下)，经纬度用英文逗号隔开，不同经纬度之间使用空格分割</p>
            <Input type="text" value={this.state.location} onChange={e => { this.handleChange(e) }} placeholder='请输入坐标信息, 例如31.11,114.11 38.12,114.11 38.12,119.12 31.11,119.12' style={{ margin: '0 8px 0 0', width: '40em' }} />
            <Button type='primary' className='btn btn-primary' onClick={() => this.put()}>上传</Button>

          </div>
        </form>
      </div>

    )
  }
}

export default UploadControl
