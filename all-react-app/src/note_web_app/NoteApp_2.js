import React from 'react'
import '../css/note_web_app_2.css'
import '../css/font-awesome-4.7.0/css/font-awesome.min.css'
import '../css/bootstrap.min.css'


class Note extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      isCheck: false,
      isPin: false,
      content: `
        <b>The Angel Fall</b>
        <br>
        The brightest star
      `
    }
    this.checkHandle = this.checkHandle.bind(this)
    this.pinHandle = this.pinHandle.bind(this)
    this.openEditorHandle = this.openEditorHandle.bind(this)
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

  openEditorHandle(){
    // this.props.openEditorHandle(this.state.content)
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
          <div onClick={this.openEditorHandle} className="p-3 h-100">
            <div className="date">
              30 July, 2015
            </div>
            <div id="content" className="content" dangerouslySetInnerHTML={{__html: this.state.content}}>
              
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class Body extends React.Component{

  

  render(){
    return(
      <div className="row">
        <Note openEditorHandle={this.props.openEditorHandle}/>
      </div>
    )
  }
}

class NoteApp extends React.Component{
  render(){
    return(
      <div className="container">
        <Body />
      </div>
    )
  }
}

export default NoteApp