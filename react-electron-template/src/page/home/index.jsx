import React from "react";
import './index.css'
import PageTitle from "../../component/page-title/index.jsx";
import MyImage from "../../component/image/index.jsx";
import Query from "../../component/query";
import $ from 'jquery'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      image: []
    }
  }

  componentDidMount () {
    $.ajax({
      url: '/meta/search/objects',
      type: 'get'
    }).then((res) => {
      console.log(res)
      res = res.filter(item => { return item.size > 0 })
      this.setState({ image: res.slice(0, 12), images: res })
    }).catch(err => {
      err = [{"name":"123.jpg","version":4,"size":0,"hash":"","location":"","thumbnai":""},{"name":"response.png","version":2,"size":0,"hash":"","location":"","thumbnai":""},{"name":"123.png","version":2,"size":0,"hash":"","location":"","thumbnai":""},{"name":"text.png","version":19,"size":0,"hash":"","location":"","thumbnai":""},{"name":"response.jpeg","version":2,"size":0,"hash":"","location":"","thumbnai":""},{"name":"eason.jpeg","version":5,"size":878193,"hash":"QzWR4frhPznVL+E2s6JSlFvIAI1YIDHU75vNr1y7MMo=","location":"['31.11,114.11', '38.12,114.11', '38.12,119.12', '31.11,119.12']","thumbnai":""},{"name":"mic.jpeg","version":9,"size":1001557,"hash":"wBE1U2izqcVsq0FJD5Er9KFcCGYx+VTNA/zzRvSFY6o=","location":"['42.11,135.11', '49.12,135.11', '49.12,149.12', '42.11,149.12']","thumbnai":""},{"name":"test.png","version":2,"size":0,"hash":"","location":"","thumbnai":""}]
      err = err.filter(item => { return item.size > 0 })
      this.setState({ image: err.slice(0, 12), images: err })
    })
  }

  query (res) {
    console.log('res', res)
    if (res === 'flush') {
      $.ajax({
        url: '/meta/search/objects',
        type: 'get'
      }).then((res) => {
        console.log(res)
        res = res.filter(item => { return item.size > 0 })
        this.setState({ image: res.slice(0, 12), images: res })
      }).catch(err => {
        err = [{"name":"123.jpg","version":4,"size":0,"hash":"","location":"","thumbnai":""},{"name":"response.png","version":2,"size":0,"hash":"","location":"","thumbnai":""},{"name":"123.png","version":2,"size":0,"hash":"","location":"","thumbnai":""},{"name":"text.png","version":19,"size":0,"hash":"","location":"","thumbnai":""},{"name":"response.jpeg","version":2,"size":0,"hash":"","location":"","thumbnai":""},{"name":"eason.jpeg","version":5,"size":878193,"hash":"QzWR4frhPznVL+E2s6JSlFvIAI1YIDHU75vNr1y7MMo=","location":"['31.11,114.11', '38.12,114.11', '38.12,119.12', '31.11,119.12']","thumbnai":""},{"name":"mic.jpeg","version":9,"size":1001557,"hash":"wBE1U2izqcVsq0FJD5Er9KFcCGYx+VTNA/zzRvSFY6o=","location":"['42.11,135.11', '49.12,135.11', '49.12,149.12', '42.11,149.12']","thumbnai":""},{"name":"test.png","version":2,"size":0,"hash":"","location":"","thumbnai":""}]
        err = err.filter(item => { return item.size > 0 })
        this.setState({ image: err.slice(0, 12), images: err })
      })
      return
    }
    this.setState({image: res.slice(0, 12), images: res})
  }

  render() {
    console.log('home', this.state.image)
    console.log('home', this.state.images)
    return (
      <div id='page-wrapper'>
        <PageTitle title='我的文件' />
        <Query images={this.state.images} query={(e) => this.query(e)}/>
        <MyImage image={this.state.image} images={this.state.images}/>
      </div>
    )
  }
}

export default Home
