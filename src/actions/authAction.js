import axios from 'axios';
import setAuthorizationToken from '../utils/setTocken';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER, SET_USER_DRADTS } from './types';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}
export function setDrafts(drafts) {
  return {
    type: SET_USER_DRADTS,
    drafts
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}
export function getdraft(user){
  var apiBaseUrl = "https://chinabackend.bestlarp.com";
  return dispatch => {
    dispatch(setDrafts("loading"));
    if(user.id==='5a273150c55b0d1ce0d6754d'){
      return axios.get(apiBaseUrl+'/api/app?type__in=game,draft,template').then(res=>{
        dispatch(setDrafts(res.data));
      });
    }else{
      return axios.get(apiBaseUrl+'/api/app?type__in=draft,template&author='+user.id).then(res=>{
        dispatch(setDrafts(res.data));
      });
  }
  }
}
export function login(data) {
  var apiBaseUrl = "https://chinabackend.bestlarp.com";
  return dispatch => {
    return axios.post(apiBaseUrl+'/auth', data).then(res => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
      dispatch(getdraft(jwtDecode(localStorage.jwtToken)));
    });
  }
}
export function wxlogin(openid,username) {
  console.log("called")
  var apiBaseUrl = "https://chinabackend.bestlarp.com";
  var data={
    openid:openid,
    username:username
  }
  return dispatch => {
    return axios.post(apiBaseUrl+'/wxauth', data).then(res => {
      console.log(res)
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      var user=jwtDecode(token)
      console.log(user)
      //var modified = Object.assign({},{...user,username:username})
      dispatch(setCurrentUser(user));
      dispatch(getdraft(jwtDecode(localStorage.jwtToken)));
    });
  }
}
