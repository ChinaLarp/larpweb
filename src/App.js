import React, { Component } from 'react';
import Header from './components/header.js'
import Footer from './components/footer.js'
import Menu from './components/menu.js'
import Home from './pages/home.js';
import News from './pages/news.js';
import Contact from './pages/contact.js';
import Users from './pages/users.js';
import scriptEdit from './pages/scriptEdit.js';
import ScriptUpload from './pages/scriptUpload.js'
import './App.css';
import Loginscreen from './pages/Loginscreen'
import injectTapEventPlugin from 'react-tap-event-plugin';
import FlashMessagesList from './components/flashmessagelist';
import {
  Route,
  NavLink,
  HashRouter
} from 'react-router-dom';
import NewsDetail from './pages/newsDetail.js';
//import MediaQuery from 'react-responsive';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="jumbotron" style={{backgroundColor:"transparent" }}>
        <div className="container">
          <Header />
          <Menu />
          </div>
        </div>
        <FlashMessagesList />
        <HashRouter>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/news" component={News}/>
            <Route path="/users" component={Users}/>
            <Route path="/scriptUpload" component={ScriptUpload}/>
            <Route path="/scriptEdit/:_id" component={scriptEdit}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/Loginscreen" component={Loginscreen}/>
			      <Route path="/details/:_id" component={NewsDetail}></Route>
          </div>

      </HashRouter>

        <div className="jumbotron" style={{backgroundColor:"transparent"}}>
        <div className="container">
          <Footer />
          </div>
        </div>
        </div>
      
    );
  }
}

export default App;
