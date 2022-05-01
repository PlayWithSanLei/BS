import React from "react";
import './index.css';
import {Card, Checkbox, Image, Pagination} from "antd";

const CheckboxGroup = Checkbox.Group;

class MyImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      image: [],
      size: 12,
      sizeOptions: ['12', '24', '50'],
      e: 1,
      indeterminate: true,
      checkedList: []
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/meta/search/objects',
      type: 'get'
    }).then((res) => {
      this.setState({image: res.slice(0, 12), images: res})
    })

  }

  handleChange(e) {
    this.setState({e: e})
  }

  handleSizeChange(e, size) {
    console.log(e, size)
    this.setState({size: size})
  }

  baseControl() {
    const gridStyle = {
      textAlign: 'center',
      display: 'inline-block'
    };
    const {images, size, e} = this.state
    const image = images.slice((e - 1) * size, e * size)
    const control = image.map((item, index) => {
      return (
        <div style={gridStyle}>

          <div>
            <Image src='http://101.43.156.185:9426/453f5cf4f247d6fb5380ca40e497113.png'
                   preview={{
                     src: 'http://101.43.156.185:9426/zw.png',
                   }}
                   width={150} height={150}/>
            <span style={{display: "block", textAlign: "center", marginTop: '1em'}}>{item.name}</span>
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

  onCheckAllChange(e) {
    let dataList = []
    const {image} = this.state;
    for (let i = 0; i < image.length; i++) {
      dataList[i] = image[i].id
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
      indeterminate: !!checkedList.length && (checkedList.length < this.state.image.length),
      checkAll: checkedList.length === this.state.image.length
    })
  }

  check(e) {
    const checkedList = [...this.state.checkedList]
    if (checkedList.indexOf(e.target.value) >= 0) {
      checkedList.splice(checkedList.indexOf(e.target.value), 1)
    } else {
      checkedList.push(e.target.value)
    }
    this.setState({checkedList})
  }

  render() {
    return (
      <div className='image-container'>
        <div className='wrapper'>
          <Checkbox
            className='myCheckbox'
            indeterminate={this.state.indeterminate}
            onChange={(e) => {
              this.onCheckAllChange(e)
            }}
            checked={this.state.checkAll}
          >
            全选
          </Checkbox>
          <CheckboxGroup onChange={(e) => this.onCheckGroupChange(e)} value={this.state.checkedList}>
              {
                this.baseControl()
              }
          </CheckboxGroup>
        </div>
        <Pagination
          className='myPage'
          total={this.state.images.length}
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
