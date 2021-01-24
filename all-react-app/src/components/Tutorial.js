import React from 'react'
import '../css/tutorial.css'
import Board from './Board'
import InputState from './InputState'
import TodoList from './TodoList'

class Tutorial extends React.Component {
  render(){
    /**
     * Hàm render chỉ có thể return đúng 1 thẻ cha
     */
    return (
      <div className='container'>
        <h1>This is Tutorial React.</h1>
        <Board />
        <InputState />
        <TodoList />
      </div>
    )
  }
}

export default Tutorial;
