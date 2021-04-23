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
      editingId: undefined,
      content: null,
      noteList: [
        {
          date: '30 July, 2015',
          content: `
            <b>The Angel Fall</b>
            <br>
            The brightest star 1
          `
        },
        {
          date: '30 July, 2015',
          content: `
            <b>The Angel Fall</b>
            <br>
            The brightest star 2
          `
        },
        {
          date: '30 July, 2015',
          content: `
            <b>The Angel Fall</b>
            <br>
            The brightest star 3
          `
        },
        {
          date: '30 July, 2015',
          content: `
            <b>The Angel Fall</b>
            <br>
            The brightest star 4
          `
        },
        {
          date: '30 July, 2015',
          content: `
            <b>The Angel Fall</b>
            <br>
            The brightest star 5
          `
        }
      ]
    }
    this.openEditorHandle = this.openEditorHandle.bind(this)
    this.closeEditorHandle = this.closeEditorHandle.bind(this)
  }

  openEditorHandle(id, content){
    console.log('openEditor: \n',content)
    this.setState({
      isOpenEditor: true,
      editingId: id,
      content: content
    })
  }

  closeEditorHandle(content){
    console.log('closeEditor: \n',content)
    const newNodeList = this.state.noteList
    newNodeList[this.state.editingId].content = content
    this.setState({
      isOpenEditor: false,
      editingId: undefined,
      content: null,
      nodeList: newNodeList
    })

  }

  render(){
    return(
      <div>
        <Editor closeEditorHandle={this.closeEditorHandle} content={this.state.content} isOpenEditor={this.state.isOpenEditor}/>
        <Container noteList={this.state.noteList} openEditorHandle={this.openEditorHandle}/>
      </div>
    )
  }
}

export default NoteApp