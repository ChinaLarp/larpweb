import React, { Component } from 'react';
import Header from './components/header.js'
import Footer from './components/footer.js'
import Menu from './components/menu.js'
import './App.css';
import Loginscreen from './Loginscreen'
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header class="jumbotron" style={{ position: 'fixed', width: '100%' }}/>
        <Menu class="container col-sm-8"/>
        <Footer class="jumbotron"/>
      </div>
    );
  }
}

export default App;
