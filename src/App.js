import React, { Component } from 'react';
import Header from './components/header.js'
import Footer from './components/footer.js'
import Menu from './components/menu.js'
import Home from './home.js';
import News from './news.js';
import Contact from './contact.js';
import Users from './users.js';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
<<<<<<< HEAD
import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import { createStore } from 'redux';
import { sessionService } from 'redux-react-session';
const reducers = {
  // ... your other reducers here ...
  session: sessionReducer
};
const reducer = combineReducers(reducers);
const store = createStore(reducer)
const options = { refreshOnCheckAuth: true, redirectPath: '/home', driver: 'COOKIES' };
sessionService.initSessionService(store, options)
  .then(() => console.log('Redux React Session is ready and a session was refreshed from your storage'))
  .catch(() => console.log('Redux React Session is ready and there is no session in your storage'));

=======
import {
  Route,
  NavLink,
  HashRouter
} from 'react-router-dom';
import NewsDetail from './newsDetail.js';
//import MediaQuery from 'react-responsive';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
>>>>>>> cc72e0d8cf6f30aa8df8d285a10dca7f3adfcaee
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
