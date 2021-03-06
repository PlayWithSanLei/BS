import React from "react";

class PageTitle extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.title = this.props.title + ' - YGY'
  }

  render() {
    return (
      <div className="row" style={{height: '4em'}}>
        <div className="col-md-12">
          <h1 className='page-header'>{this.props.title}</h1>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default PageTitle
