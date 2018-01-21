import { FETCH_POSTS } from '../actions/types';
//import isEmpty from 'lodash/isEmpty';

const initialState = {
  fetching: false,
  fetched: false,
  posts: []
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case FETCH_POSTS:
      return {
        fetching: false,
        fetched: true,
        posts: action.posts
      };
    default: return state;
  }
}
