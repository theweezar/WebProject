import React from 'react'
import '../css/note_web_app_2.css'
import '../css/font-awesome-4.7.0/css/font-awesome.min.css'
import '../css/bootstrap.min.css'
import Container from './Container'
import Editor from './Editor'

class NoteApp extends React.Component{




  render(){
    return(
      <div>
        <Editor content=''/>
        <Container />
      </div>
    )
  }
}

export default NoteApp