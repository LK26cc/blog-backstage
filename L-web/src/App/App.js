import React,{Component} from 'react'
import Sidebar from '../Components/Sidebar/'
import Header from '../Components/Header/'
import NavPath from '../Components/NavPath/'
import Footer from '../Components/Footer/'
import './App.css'
class App extends Component {
  render(){
    let containerHeight = document.body.clientHeight - 64 - 64 - 18- 48
    const user = JSON.parse(localStorage.getItem('user'))
    return (
      <div className="ant-layout-aside">
        <Sidebar />
        <div className="ant-layout-main">
          <Header user={user} />
          <NavPath />
          <div className="ant-layout-container" style={{height:containerHeight}}>
            <div className="ant-layout-content">
              {this.props.children}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default App
