import React from "react";
import './index.css';
import { Modal, Checkbox, Image, Pagination, Button, Table } from "antd";
import $ from 'jquery'

const CheckboxGroup = Checkbox.Group;
const child_process = window.require('child_process');

class MyImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: props.images,
      image: props.image,
      size: 12,
      e: 1,
      indeterminate: true,
      checkedList: [],
      visible: false,
      confirmLoading: false,
      modalText: '确认要删除吗？一经删除不可恢复哦！',
      his_visible: false,
      columns: [
        {
          title: '文件名',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '版本',
          dataIndex: 'version',
          key: 'version'
        },
        {
          title: '大小',
          dataIndex: 'size',
          key: 'size'
        },
        {
          title: '位置',
          dataIndex: 'location',
          key: 'location'
        }
      ]
    }
    this.images = 0
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  flush() {
    $.ajax({
      url: '/meta/search/objects',
      type: 'get'
    }).then((res) => {
      console.log('flush', res)
      res = res.filter(item => { return item.size > 0 })
      this.setState({ image: res.slice(0, 12), images: res, checkedList: [] })
      this.forceUpdate()
    })
  }

  handleChange(e) {
    this.setState({ e: e })
  }

  handleSizeChange(e, size) {
    console.log(e, size)
    this.setState({ size: size })
  }

  onCheckAllChange(e) {
    let dataList = []
    const { image } = this.state;
    for (let i = 0; i < image.length; i++) {
      dataList[i] = image[i].name
    }
    this.setState({
      checkedList: e.target.checked ? dataList : [],
      indeterminate: false,
      checkAll: e.target.checked
    })
  };

  onCheckGroupChange(checkedList) {
    console.log('checked = ', checkedList)
    this.setState({
      checkedList: checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < this.props.image.length),
      checkAll: checkedList.length === this.props.image.length
    })
  }

  check(e) {
    const checkedList = [...this.state.checkedList]
    if (checkedList.indexOf(e.target.value) >= 0) {
      checkedList.splice(checkedList.indexOf(e.target.value), 1)
    } else {
      checkedList.push(e.target.value)
    }
    this.setState({ checkedList })
  }

  downLoad(e) {
    const { checkedList } = this.state
    let flag = 1
    alert('后台下载中，请稍后...')
    for (let i = 0; i < checkedList.length; i++) {
      const url = '101.43.156.185:8080/objects/' + checkedList[i]
      // eslint-disable-next-line no-loop-func
      child_process.exec('curl -vv ' + url + ' --output /Users/zhanghao/DownIMG/' 
      // eslint-disable-next-line no-loop-func
      + checkedList[i], (_error, _stdin, stdout) => {
        if (stdout) {
          console.log(stdout)
          // eslint-disable-next-line no-useless-concat
          alert('下载完成，文件位于：' + '/Users/zhanghao/DownIMG/' 
          // eslint-disable-next-line no-useless-concat
          + checkedList[i] + '\n' + '已完成（' + flag++ + '/' + checkedList.length + '）')
        }
      })
    }
  }

  delete() {
    console.log('detele')
    const { checkedList } = this.state;
    for (let i = 0; i < checkedList.length; i++) {
      $.ajax({
        url: '/objects/' + checkedList[i],
        type: 'delete'
      }).then((res) => {
        console.log(res)
        if (i === checkedList.length - 1) {
          this.setState({ visible: false, confirmLoading: false, modalText: '确认要删除吗？一经删除不可恢复哦！' })
          this.flush()
        }
      }).catch(err => {
        alert(err.statusText)
        this.setState({ visible: false, confirmLoading: false, modalText: '确认要删除吗？一经删除不可恢复哦！' })
        this.flush()
      })
    }

  }

  showModal() {
    this.setState({ visible: true })
  }

  handleOk() {
    this.setState({ modalText: '删除中，请稍后……', confirmLoading: true })
    this.delete()
  }

  handleCancel() {
    this.setState({ visible: false })
    this.flush()
  }

  history() {
    const { checkedList } = this.state
    this.setState({ his_visible: true })
    for (let i = 0; i < checkedList.length; i++) {
      $.ajax({
        url: '/meta/search/object/' + checkedList[i],
        type: 'get'
      }).then((res) => {
        res = res.filter(item => { return item.size > 0 })
        for (let i = 0; i < res.length; i++) {
          res[i].key = i
        }
        console.log(res)
        this.setState({ hisDataSource: res })
      }).catch(err => {
        const res = [
          {
            key: 0,
            name: 'eason.jpeg',
            version: 1,
            size: 27236384,
            location: ['31.11,114.11', '38.12,114.11', '38.12,119.12', '31.11,119.12']
          },
          {
            key: 1,
            name: 'eason.jpeg',
            version: 2,
            size: 27232384,
            location: ['91.11,114.11', '38.12,114.11', '38.12,119.12', '91.11,119.12']
          },
          {
            key: 2,
            name: 'eason.jpeg',
            version: 3,
            size: 12236384,
            location: ['34.11,114.11', '38.12,114.11', '38.12,119.12', '34.11,119.12']
          },
          {
            key: 3,
            name: 'eason.jpeg',
            version: 4,
            size: 52336384,
            location: ['91.11,114.11', '38.12,114.11', '38.12,119.12', '91.11,119.12']
          },
        ]
        this.setState({ hisDataSource: res })
      })
    }

  }

  baseControl() {
    const gridStyle = {
      textAlign: 'center',
      display: 'inline-block'
    };
    const { size, e } = this.state
    const images = this.props.images
    const image = images.slice((e - 1) * size, e * size)
    const control = image?.map?.((item, index) => {
      return (
        <div style={gridStyle}>
          <div>
            <Image src='http://101.43.156.185:9426/453f5cf4f247d6fb5380ca40e497113.png'
              preview={{
                src: 'http://101.43.156.185:9426/zw.png',
              }}
              width={150} height={150} />
            <span style={{ display: "block", textAlign: "center", marginTop: '1em' }}>{item.name}</span>
          </div>
          <Checkbox
            className='mySubCheckbox'
            value={item.name}
            onClick={(e) => this.check(e)}
          />
        </div>
      )
    })
    return control;
  }

  handleHisOk() {
    const {selectedRows} = this.state
    console.log(selectedRows)
    const url = '101.43.156.185:8080/objects/' + selectedRows.name + '?version=' + selectedRows.version
    alert('后台下载中，请稍后……')
      child_process.exec('curl -vv ' + url + ' --output /Users/zhanghao/DownIMG/' + selectedRows.name + '_version' + selectedRows.version, (_error, _stdin, stdout) => {
        console.log(_error)
        console.log(_stdin)
        console.log(stdout)
        if (stdout) {
          console.log(stdout)
          alert('下载完成，文件位于：' + '/Users/zhanghao/DownIMG/' + selectedRows.name + '_version' + selectedRows.version)
        }
      })
    this.setState({his_visible: false})
  }

  handleHisCancel() {
    this.setState({ his_visible: false })
  }

  render() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({selectedRows: selectedRows[0]})
      },
    };
    const { visible, modalText, confirmLoading, his_visible, hisDataSource, columns } = this.state;
    return (
      <div className='image-container'>
        <div className='wrapper'>
          {this.props.images.length ? <div style={{ display: 'flex', alignItems: 'center' }}><Checkbox
            className='myCheckbox'
            indeterminate={this.state.indeterminate}
            onChange={(e) => {
              this.onCheckAllChange(e)
            }}
            checked={this.state.checkAll}
          >
            全选
          </Checkbox>
            <Button className='toolbar' size='small' onClick={e => this.flush(e)}>刷新</Button>
            {this.state.checkedList.length ?
              <div className='button-wrapper'>
                <Button className='toolbar' size='small' onClick={e => this.history(e)}>查看文件历史版本</Button>
                <Modal
                  title="文件历史"
                  visible={his_visible}
                  onOk={e => this.handleHisOk()}
                  onCancel={() => this.handleHisCancel()}
                  okText='下载'
                  cancelText='取消'
                  width='650px'
                >
                  <Table
                    dataSource={hisDataSource}
                    columns={columns}
                    rowSelection={{
                      type: 'radio',
                      ...rowSelection
                    }}
                  />
                </Modal>
                <Button className='toolbar' size='small' onClick={e => this.downLoad(e)}>下载</Button>
                <Button className='toolbar' type='danger' size='small' onClick={e => this.showModal(e)}>删除</Button>
                <Modal
                  title="提示"
                  visible={visible}
                  onOk={e => this.handleOk()}
                  confirmLoading={confirmLoading}
                  onCancel={() => this.handleCancel()}
                >
                  <p>{modalText}</p>
                </Modal>
              </div> : null}
          </div> : null}

          <CheckboxGroup onChange={(e) => this.onCheckGroupChange(e)} value={this.state.checkedList}>
            {
              this.baseControl()
            }
          </CheckboxGroup>
        </div>
        <Pagination
          className='myPage'
          total={this.props.images.length}
          onChange={e => {
            this.handleChange(e)
          }}
          showSizeChanger={false}
          showTotal={total => `共 ${total} 张遥感影像图`}
          onShowSizeChange={(e, s) => {
            this.handleSizeChange(e, s)
          }}
          pageSize={this.state.size}
        />
      </div>
    )
  }
}

export default MyImage
