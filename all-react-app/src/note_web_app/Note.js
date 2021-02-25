import React from 'react'

class Note extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      isCheck: false,
      isPin: false
    }
    this.checkHandle = this.checkHandle.bind(this)
    this.pinHandle = this.pinHandle.bind(this)
  }

  checkHandle(){
    this.setState(state => ({
      isCheck: !state.isCheck
    }))
  }

  pinHandle(){
    this.setState(state => ({
      isPin: !state.isPin
    }))
  }

  render(){
    return(
      <div className="col-lg-3 d-flex justify-content-center">
        <div className="note shadow-sm bg-white">
          <div className="top-btn position-relative">
            <div id="check-btn" onClick={this.checkHandle} 
            className={!this.state.isCheck ? 'check-btn position-absolute':'check-btn position-absolute opacity opacity-1'}>
              <i className={!this.state.isCheck ? 'fa fa-check-circle-o':'fa fa-check-circle'} aria-hidden="true"></i>
            </div>
            <div id="pin-btn" onClick={this.pinHandle} 
            className={!this.state.isPin ? 'pin-btn position-absolute':'pin-btn position-absolute opacity-1'}>
              <i className={!this.state.isPin ? 'fa fa-circle-o':'fa fa-circle'} aria-hidden="true"></i>
            </div>
          </div>
          <div className="p-3">
            <div className="date">
              30 July, 2015
            </div>
            <div className="content">
              <b>The Angel Fall</b>
              <br/>
              The brightest star
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Note