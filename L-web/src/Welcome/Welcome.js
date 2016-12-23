import React,{Component} from 'react'
import './Welcome.css'
import isLogin from '../Components/isLogin'
class Welcome extends Component {
  constructor (){
    super()
    isLogin()
  }
  render(){
    return (
      <div className="welcome-container">
        <p>欢迎~</p>
      </div>

    )
  }
}

export default Welcome
