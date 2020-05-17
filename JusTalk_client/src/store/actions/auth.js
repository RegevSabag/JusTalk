import axios from 'axios';
import {setAuthToken} from '../../utils';
import { SET_LOADING, LOGIN_SUCCESS, LOG_OUT, INIT_ALL_CONVERSATIONS } from '../actions/types';
import * as actionError from './errors';
import * as actionUsers from '../../store/actions/users';
import {arrayBufferToBase64 ,compare} from '../../utils';
import { URL } from '../../utils';

// Login User
export const login = ( email, password ) => async dispatch =>{
  dispatch({ type:SET_LOADING, payload:true});
  const config = { headers: { 'Content-Type':'application/json' } };
  const body = JSON.stringify({email, password });
  axios.post(URL+'api/auth/login',body,config).then(response =>{
    localStorage.setItem('token',response.data.token);
    dispatch(loadUser(response.data.token));
  }).catch(err => {
    console.log('error');
    if(err.message !== "Network Error" && err.response.data.errors){
      err.response.data.errors.map( val => {
        return dispatch(actionError.setError(val.msg, 3000));
      })
    }
    else{
      alert(err.message);
    }
    dispatch({type:SET_LOADING,payload:false});
  })
}

// Register User
export const register = (file, {name,email,password}) => async dispatch =>{
  dispatch({ type:SET_LOADING, payload:true});
  const config = { headers: { 'Content-Type': 'multipart/form-data'} };
  var bodyFormData = new FormData();
  bodyFormData.append('file', file);
  bodyFormData.set("email",email);
  bodyFormData.set("password",password);
  bodyFormData.set("name",name);
  axios.post(URL+'api/auth/register',bodyFormData,config).then(response =>{
    localStorage.setItem('token',response.data.token);
    dispatch(loadUser(response.data.token));
  }).catch(err => {
    console.log('error');
    if(err.message !== "Network Error" && err.response.data.errors){
      err.response.data.errors.map( val => {
        return dispatch(actionError.setError(val.msg, 3000));
      })
    }
    else{
      alert(err.message);
    }
    dispatch({type:SET_LOADING,payload:false});
  })
}

// Load User
export const loadUser = (token) => async dispatch =>{
  setAuthToken(token);
  axios.get(URL+'api/auth').then(response => {
    var allConversation = [];
    var base64Flag = 'data:image/jpeg;base64,';
    var imageStr = arrayBufferToBase64(response.data.avatar.data.data);
    response.data.avatar = base64Flag + imageStr;
    for(const friend of response.data.friends){
      imageStr = arrayBufferToBase64(friend.user.avatar.data.data);
      friend.user.avatar = base64Flag + imageStr;
      allConversation.push({type:'friend',value:friend});
    }
    for(const group of response.data.groups){
      imageStr = arrayBufferToBase64(group.group.avatar.data.data);
      group.group.avatar = base64Flag + imageStr;
      for( const people of group.group.people)
      {
        imageStr = arrayBufferToBase64(people.avatar.data.data);
        people.avatar = base64Flag + imageStr;
      }
      allConversation.push({type:'group',value:group});
    }
    allConversation.sort(compare);
    dispatch({type:INIT_ALL_CONVERSATIONS,payload:allConversation});
    dispatch({ type:LOGIN_SUCCESS, payload:response.data});
    dispatch(actionUsers.initUsers());
  }).catch(err => {
    alert(err.message);
    dispatch({type:SET_LOADING,payload:false});
  })
}

// Log out
export const logOut = () => async (dispatch,getState) => {
  localStorage.removeItem('token');
  getState().auth.socket.disconnect();
  dispatch({type:LOG_OUT});
}