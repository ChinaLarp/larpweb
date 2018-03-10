import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import setAuthorizationToken from './utils/setTocken';
import jwtDecode from 'jwt-decode';
import { setCurrentUser,getdraft } from './actions/authAction';
import registerServiceWorker from './registerServiceWorker';
import {fetchproducts} from './actions/productActions'
import {fetchpost} from './actions/postActions'
import App from './App';

import './index.css';

//material-ui Theme
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk,logger),
    //adding browser devToolsExtension when exists
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

ReactDOM.render(
<Provider store={store}>
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <App history={BrowserRouter} />
  </MuiThemeProvider>
</Provider>,
document.getElementById('root'));

registerServiceWorker();
