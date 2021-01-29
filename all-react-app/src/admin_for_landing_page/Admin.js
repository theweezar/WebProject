import React from 'react'

import '../css/admin_for_landing_page.css'
import Navigator from './Navigator'
import Body from './Body'

class Admin extends React.Component{
  
  render(){
    return(
      <div className="containter-fluid row no-margin">
        <Navigator className="col-lg-2 col-md-2 col-sm-2 border border-right-dark bg-white"/>
        <Body className="col-lg-10 col-md-10 col-sm-10"/>
      </div>
    )
  }
}

export default Admin