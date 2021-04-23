import React from 'react'
import Note from './Note'

function Header(){
  return(
    <div className="header row align-items-center mb-3">
      <div className="col-lg-9 brand lead pointer">
        SimpleNote.vn
      </div>
      <div className="col-lg-3 d-flex justify-content-center">
        <ul className="nav func-nav">
          <li id="add-btn" className="nav-item px-4 active">
            <i className="fa fa-plus-square-o" aria-hidden="true"></i>
          </li>
          <li id="del-btn" className="nav-item px-4 active">
            <i className="fa fa-trash-o" aria-hidden="true"></i>
          </li>
          <li id="alert-btn" className="nav-item px-4 active">
            <i className="fa fa-bell-o" aria-hidden="true"></i>
          </li>
        </ul>
      </div>
    </div>
  )
}

class List extends React.Component{

  generateRow(f, t){
    const row = []

    for(let i = f; i < t; i++){
      row.push(<Note key={i} id={i} openEditorHandle={this.props.openEditorHandle}
        content={this.props.noteList[i].content} date={this.props.noteList[i].date} />)
    }

    return(
      <div key={f-4} className="row mb-4">
        {row}
      </div>
    )
  }

  generateList(){

    const list = []
    const length = this.props.noteList.length
    var now = 0
    var left = length
    do{
      if (left < 4) {
        list.push(this.generateRow(now, now + left))
      }
      else {
        list.push(this.generateRow(now, now + 4))
      }
      left -= 4
      now += 4
    }
    while(left > 0)

    return list
  }

  render(){
    console.log(this.props.noteList)
    return(
      <div className="list">
        {this.generateList()}
      </div>
    )
  }
}



class Container extends React.Component{
  render(){
    return(
      <div className="container py-4">
        <Header/>
        {/* pass function qua từng component cho đến khi chạm đến thằng phần tử note */}
        <List noteList={this.props.noteList} openEditorHandle={this.props.openEditorHandle}/>
      </div>
    )
  }
}

export default Container