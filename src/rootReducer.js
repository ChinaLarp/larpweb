import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import posts from './reducers/posts';
import products from './reducers/products';

export default combineReducers({
  flashMessages,
  auth,
  posts,
  products
});
