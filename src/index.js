import React from 'react';
import ReactDOM from 'react-dom';
import { Router, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import setAuthorizationToken from './utils/setTocken';
import jwtDecode from 'jwt-decode';
import { setCurrentUser,setDrafts,getdraft } from './actions/authAction';
import registerServiceWorker from './registerServiceWorker';
import {fetchproducts} from './actions/productActions'
import {fetchpost} from './actions/postActions'
import App from './App';
import './index.css';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk,logger),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  store.dispatch(getdraft(jwtDecode(localStorage.jwtToken)));
}
store.dispatch(fetchpost())
store.dispatch(fetchproducts())

ReactDOM.render(<Provider store={store}><App history={BrowserRouter} /></Provider>, document.getElementById('root'));

registerServiceWorker();
