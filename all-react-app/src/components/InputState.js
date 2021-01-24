import React from 'react'

class InputState extends React.Component{
  /**
   * Hàm khởi tạo này có tác dụng khởi tạo hằng state và những biến khác 
   */
  constructor(props){
    super(props)
    this.state = {
      val: ""
    }
    this.onChangeHandle = this.onChangeHandle.bind(this)
  }

  onChangeHandle(e){
    this.setState({val:e.target.value})
  }

  render(){
    return(
      <div className="mt-4">
        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">onChange</span>
          </div>
          <input type="text" className="form-control" placeholder="Type something here" aria-label="Small" aria-describedby="inputGroup-sizing-sm"
          onChange={this.onChangeHandle}/>
        </div>
        <h3>{this.state.val}</h3>
      </div>
    )
  }

}

export default InputState