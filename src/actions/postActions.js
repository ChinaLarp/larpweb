import axios from 'axios';
import { FETCH_POSTS } from './types';

export function setPosts(posts) {
  return {
    type: FETCH_POSTS,
    posts
  };
}



export function fetchpost() {
  var Url = "https://chinabackend.bestlarp.com/api/web?type__in=news,activity";
  return dispatch => {
    return axios.get(Url).then(res => {
      dispatch(setPosts(res.data));
    });
  }
}
