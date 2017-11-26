import React, { Component } from 'react';
import Header from './components/header.js'
import Footer from './components/footer.js'
import Menu from './components/menu.js'
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
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
