import React from 'react'

class Navigator extends React.Component{

  // 4 mục: dashboard, layouts, ads, setting
  render(){
    return(
      <div className={this.props.className}>
        <div className="">
          <p>
            <span><i className="fa fa-eercast" aria-hidden="true"></i></span>&nbsp;
            <span className="lead">.toolKit</span>
          </p>
        </div>
      </div>
    )
  }
}

export default Navigator