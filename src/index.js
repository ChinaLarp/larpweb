import React from 'react';
import { render } from 'react-dom';
import { Router, BrowserRouter } from 'react-router-dom';
//import { Router,browserHistory } from 'react-router'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import setAuthorizationToken from './utils/setTocken';
import jwtDecode from 'jwt-decode';
import { setCurrentUser } from './actions/authAction';
import registerServiceWorker from './registerServiceWorker';

import App from './App';
import './index.css';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}


/*render(
  <Provider store={store}>
    <Router history={BrowserRouter} routes={routes} />
  </Provider>, document.getElementById('app')
  //<App />, document.getElementById('root')
);*/
render(
  <Provider store={store}>
    <App history={BrowserRouter} />
  </Provider>, document.getElementById('root'));
  //, document.getElementById('root'))

//registerServiceWorker();
