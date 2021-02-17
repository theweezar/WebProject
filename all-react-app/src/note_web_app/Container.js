import React from 'react'

function Header(){
  return(
    <div className="header row align-items-center">
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

function SortBar(){
  return(
    <div className="sortbar my-4">

    </div>
  )
}

class Body extends React.Component{

  constructor(props){
    super(props)
    this.checkHandle = this.checkHandle.bind(this)
  }

  checkHandle(){
    console.log('check')
  }

  render(){
    return(
      <div className="row">
        <div className="col-lg-3 d-flex justify-content-center">
          <div className="note shadow-sm bg-white">
            <div className="top-btn position-relative">
              <div id="check-btn" onClick={this.checkHandle} className="check-btn position-absolute">
                <i className="fa fa-check-circle-o" aria-hidden="true"></i>
              </div>
              <div id="pin-btn" className="pin-btn position-absolute">
                <i className="fa fa-circle-o" aria-hidden="true"></i>
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
      </div>
    )
  }
}



class Container extends React.Component{
  render(){
    return(
      <div className="container py-4">
        <Header/>
        <SortBar/>
        <Body/>
      </div>
    )
  }
}

export default Container