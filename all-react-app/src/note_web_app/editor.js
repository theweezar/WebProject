import React from 'react'

class Editor extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      content: '',
      edited: false
    }
    this.editContentHandle = this.editContentHandle.bind(this)
    this.closeEditorHandle = this.closeEditorHandle.bind(this)
    this.onloadHandle = this.onloadHandle(this)
  }
  
  editContentHandle(el){
    this.setState({
      content: el.target.innerHTML,
      edited: true
    })
  }

  closeEditorHandle(){
    // Nếu content vừa import vào editor bị thay đổi thì nó sẽ lấy cái dữ liệu mới vừa thay đổi
    if (this.state.edited) this.props.closeEditorHandle(this.state.content)
    // còn ko thì nó sẽ lấy cái dữ liệu đầu vào là props.content
    else this.props.closeEditorHandle(this.props.content)
  }

  onloadHandle(){
    // console.log(this.props)
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
          contentEditable={true} dangerouslySetInnerHTML={{__html: this.props.content}}
          onInput={this.editContentHandle}>
            
          </div>

        </div>
      </div>
    )
  }
}

export default Editor