import React, { Component } from 'react';
import Header from './components/header.js'
import Footer from './components/footer.js'
import Menu from './components/menu.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header style={{ position: 'fixed', width: '100%' }}/>
        <Menu />
        <Footer />
      </div>
    );
  }
}

export default App;
