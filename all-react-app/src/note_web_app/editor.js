import React from 'react'


class Editor extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      content: ''
    }
    this.contentHandle = this.contentHandle.bind(this)
    this.closeEditorHandle = this.closeEditorHandle.bind(this)
    
  }

  contentHandle(el){
    
  }

  closeEditorHandle(){
    this.props.closeEditorHandle()
  }

  render(){
    return(
      <div className={!this.props.isOpenEditor ? 'position-relative d-none':'position-relative'}>
        <div id="closenote-area" onClick={this.closeEditorHandle} className="overview position-absolute z-100"></div>
        <div id="editor" className="editor rounded z-100 bg-white border position-absolute">

          <div className="editor-nav shadow-sm d-flex align-items-center">
            <ul className="nav px-2">
              <li className="nav-item px-2">
                <i className="fa fa-bold" aria-hidden="true"></i>
              </li>
              <li className="nav-item px-2">
                <i className="fa fa-italic" aria-hidden="true"></i>
              </li>
              <li className="nav-item px-2">
                <i className="fa fa-underline" aria-hidden="true"></i>
              </li>
              <li className="nav-item px-2 d-flex align-items-center">
                <label className="m-0" htmlFor="font-size-select">Font: </label>
                <select className="ml-2" name="" id="font-size-select">
                  <option value="">18 pixels</option>
                </select>
              </li>
              <li className="nav-item px-2">
                <i className="fa fa-list" aria-hidden="true"></i>
              </li>
              <li className="nav-item px-2">
                <i className="fa fa-check-square-o" aria-hidden="true"></i>
              </li>
              <li className="nav-item px-2">
                <i className="fa fa-picture-o" aria-hidden="true"></i>
              </li>
              <li className="nav-item px-2 d-flex justify-content-center align-items-center">
                <div className="color-palette"></div>
              </li>
            </ul>
          </div>

          <div className="editor-content py-2 px-3" id="content-note" 
          contentEditable={true} dangerouslySetInnerHTML={{__html: this.props.content}} onInput={this.contentHandle}>
            
          </div>

        </div>
      </div>
    )
  }
}

export default Editor