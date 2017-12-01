import axios from 'axios';

export function userSignupRequest(userData) {
  var apiBaseUrl = "https://usbackendwjn704.larpxiaozhushou.tk";
  return dispatch => {
    return axios.post(apiBaseUrl+'/user', userData);
  }
}

export function isUserExists(identifier) {
  return dispatch => {
    return axios.get(`/api/users/${identifier}`);
  }
}
