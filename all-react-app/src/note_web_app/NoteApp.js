import React from 'react'
import '../css/note_web_app_2.css'
import '../css/font-awesome-4.7.0/css/font-awesome.min.css'
import '../css/bootstrap.min.css'
import Container from './Container'
import Editor from './Editor'

class NoteApp extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      isOpenEditor: false,
      content: null
    }
    this.openEditorHandle = this.openEditorHandle.bind(this)
    this.closeEditorHandle = this.closeEditorHandle.bind(this)
  }

  openEditorHandle(content){
    console.log('openEditor in NoteApp with content\n',content)
    this.setState({
      isOpenEditor: true,
      content: content
    })
  }

  closeEditorHandle(){
    console.log('closed editor')
    this.setState({
      isOpenEditor: false,
      content: null
    })
  }

  render(){
    return(
      <div>
        <Editor closeEditorHandle={this.closeEditorHandle} content={this.state.content} isOpenEditor={this.state.isOpenEditor}/>
        <Container openEditorHandle={this.openEditorHandle}/>
      </div>
    )
  }
}

export default NoteApp