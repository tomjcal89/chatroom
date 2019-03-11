import React, { Component } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Chat from './components/Chat'


class App extends Component {
    
  render() {

    return (
          <div className={styles.root}>    
            <NavBar/>
            <Chat/>

          </div>
    );
  }
}
const styles = {
  
}  


export default App;