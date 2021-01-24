import React from 'react'

class Todo extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      done: false
    }
  }

  render(){
    return(
      <li>
        <input type="checkbox"/>
        {this.props.todo}
      </li>
    )
  }
}

class TodoList extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      todos: [],
      prepare: ""
    }
    this.onChangeHandle = this.onChangeHandle.bind(this)
    this.onClickHandle = this.onClickHandle.bind(this)
  }

  /**
   * Ta có thể gọi 1 biến trong setState mà ko ảnh hưởng đến các biến khác. Trong trường hợp này thì
   * ta thay đổi biến prepare mà biến todos vẫn là array, chứ ko phải là undifined 
   */
  onChangeHandle(e){
    this.setState({prepare:e.target.value})
  }

  onClickHandle(){
    this.state.todos.push(<Todo todo={this.state.prepare} key={this.state.todos.length}/>)
    this.setState({prepare:""})
  }

  render(){
    return(
      <div>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Add todo things" aria-label="Recipient's username" 
          aria-describedby="basic-addon2" value={this.state.prepare} onChange={this.onChangeHandle}/>
          <div className="input-group-append">
            <span onClick={this.onClickHandle} className="input-group-text pointer" id="basic-addon2">Add</span>
          </div>
        </div>
        <ul>
          {this.state.todos}
        </ul>
      </div>
    )
  }

}

export default TodoList