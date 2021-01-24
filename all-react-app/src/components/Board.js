import React from 'react'

/**
 * Ta có thể viết nhiều component nhỏ trong 1 file
 */

class Rows extends React.Component{

  /**
   * Hàm render_many_blocks sẽ tạo 1 array gồm nhiều tag <td></td>, sau đó trả về
   * ngoài ra nếu muốn uyển chuyển hơn ta có thể tách <td></td> ra 1 component riêng
   */
  render_many_blocks(a,b){
    var blocks = []
    for(var i = 0; i < a; i++){
      const v = parseInt(b)+i
      blocks.push(
        <td className="p-4 pointer" key={i} onClick={() => alert(`Click on block ${v}`)}>{v}</td>
      )
    }
    return (blocks)
  }

  /**
   * render sẽ nhận cái array chứa các thẻ <td></td> và đổ vào thẻ <tr></tr>
   * các this.props... dưới này được truyền từ bên ngoài vô, chúng có thể là giá trị nào đó
   * hoặc là 1 function
   */
  render(){
    // ab là amount block
    return(
      <tr>
        {this.render_many_blocks(this.props.ab,this.props.f)}
      </tr>
    )
  }
}

class Board extends React.Component{
  /**
   * render sẽ nhận component Rows có chứa các props.ab, props.f và các thẻ tr, td... trong đó và đặt vào table
   */
  render(){
    return(
      <div>
        <table>
          <tbody>
            <Rows ab='5' f='1'/>
            <Rows ab='3' f='9'/>
            <Rows ab='6' f='12'/>
          </tbody>
        </table>
      </div>
    )
  }
}

export default Board