import React, { Component } from 'react';
import Header from './components/header.js'
import Footer from './components/footer.js'
import Menu from './components/menu.js'
import Home from './pages/home.js';
import News from './pages/news.js';
import Games from './pages/games.js';
import Contact from './pages/contact.js';
import Users from './pages/users.js';
import scriptEdit from './pages/scriptEdit.js';
import ScriptUpload from './pages/scriptUpload.js';
import Loginscreen from './pages/Loginscreen';
import Register from './pages/Register.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
import FlashMessagesList from './components/flashmessagelist';
import {
  Route,
  NavLink,
  HashRouter
} from 'react-router-dom';
import NewsDetail from './pages/newsDetail.js';
import GameDetail from './pages/gameDetail.js';
//import MediaQuery from 'react-responsive';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {

  render() {
    var jumbotronStyle={
          backgroundColor:"transparent", 
          paddingTop:10, 
          paddingBottom:10, 
          marginBottom:10,
          }

    return (
      <div className="App">
        <div className="jumbotron" style={jumbotronStyle}>
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
            <Route path="/games" component={Games}/>
            <Route path="/users" component={Users}/>
            <Route path="/scriptUpload" component={ScriptUpload}/>
            <Route path="/scriptEdit/:_id" component={scriptEdit}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/Loginscreen" component={Loginscreen}/>
            <Route path="/Register" component={Register}/>
			      <Route path="/details/:_id" component={NewsDetail}></Route>
            <Route path="/gamedetails/:_id" component={GameDetail}></Route>
          </div>

      </HashRouter>

        <div className="jumbotron" style={jumbotronStyle}>
        <div className="container">
          <Footer />
          </div>
        </div>
        </div>
      
    );
  }
}

export default App;
