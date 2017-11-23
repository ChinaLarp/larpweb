import React, { Component } from 'react';
import Header from './components/header.js'
import Footer from './components/footer.js'
import Menu from './components/menu.js'
import Home from './home.js';
import News from './news.js';
import Contact from './contact.js';
import Users from './users.js';
import './App.css';
import Loginscreen from './Loginscreen'
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
  Route,
  NavLink,
  HashRouter
} from 'react-router-dom';
import NewsDetail from './newsDetail.js';
//import MediaQuery from 'react-responsive';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header class="jumbotron" style={{ position: 'fixed', width: '100%' }}/>
        <Menu class="container col-sm-8"/>

        <HashRouter>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/news" component={News}/>
            <Route path="/users" component={Users}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/Loginscreen" component={Loginscreen}/>
			<Route path="/details/:_id" component={NewsDetail}></Route>
          </div>

      </HashRouter>
        <Footer class="jumbotron"/>
      </div>
    );
  }
}

export default App;
