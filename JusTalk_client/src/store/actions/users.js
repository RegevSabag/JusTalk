import axios from 'axios';
import { INIT_USERS, SET_LOADING, ADD_FRIEND, SET_FRIEND_ONLINE, SET_FRIEND_OFFLINE,DELETE_FRIEND, SET_CLICKED_INDEX } from './types';
import {arrayBufferToBase64} from '../../utils';
import { URL } from '../../utils';


export const initUsers = ( ) => async dispatch => {
  dispatch({ type:SET_LOADING, payload:true});
  var base64Flag = 'data:image/jpeg;base64,'
  var imageStr;
  const config = { headers: { 'Content-Type':'application/json' } };
  axios.get(URL+'api/users/',config).then(response =>{
    response.data.forEach((val) => {
      imageStr = arrayBufferToBase64(val.avatar.data.data);
      val.avatar = base64Flag + imageStr;
    })
    dispatch({ type:INIT_USERS, payload:response.data });
    dispatch({ type:SET_LOADING, payload:false});
  }).catch(err => {
    console.log('error',err);
  })
}

export const addUser = (id,callBack) => async dispatch =>{
  console.log("ADD USER : ", id);
  var base64Flag = 'data:image/jpeg;base64,'
  var imageStr;
  dispatch({ type:SET_LOADING, payload:true});
  const config = { headers: { 'Content-Type':'application/json' } };
  axios.put(URL+'api/users/'+id ,config).then(response =>{
    imageStr = arrayBufferToBase64(response.data.user.avatar.data.data);
    response.data.user.avatar = base64Flag + imageStr;
    response.data.user.online = false;
    response.data.notification = 0;
    dispatch({type:ADD_FRIEND, payload:response.data});
    dispatch({type:SET_LOADING, payload:false});
    callBack()
  }).catch(err => {
    console.log('error',err);
  })
}

export const deleteUser = (id) => async dispatch =>{
  console.log("DELETE USER : ", id);
  dispatch({ type:SET_LOADING, payload:true});
  const config = { headers: { 'Content-Type':'application/json' } };
  axios.delete(URL+'api/users/'+id ,config).then(response =>{
    dispatch({type:SET_CLICKED_INDEX, payload:null});
    dispatch({type:DELETE_FRIEND, payload:id});
    dispatch({ type:SET_LOADING, payload:false});
  }).catch(err => {
    console.log('error',err);
  })
}

export const addUserFromSocket = (id) => async dispatch =>{
  console.log("ADD USER : ", id);
  var base64Flag = 'data:image/jpeg;base64,'
  var imageStr;
  const config = { headers: { 'Content-Type':'application/json' } };
  axios.put(URL+'api/users/'+id ,config).then(response =>{
    imageStr = arrayBufferToBase64(response.data.user.avatar.data.data);
    response.data.user.avatar = base64Flag + imageStr;
    response.data.user.online = true;
    response.data.notification = 1;
    dispatch({type:ADD_FRIEND, payload:response.data});
  }).catch(err => {
    console.log('error',err);
  })
}

export const setFriendOnline = (id) => async (dispatch, getState) =>{
  const friends = getState().auth.user.friends;
  friends.forEach(element => {
    if(element.user._id === id)
    {
      dispatch({type:SET_FRIEND_ONLINE,payload:id});
    }
  })
}

export const setFriendOffline = (id) => async (dispatch, getState) =>{
  const friends = getState().auth.user.friends;
  friends.forEach(element => {
    if(element.user._id === id)
    {
      dispatch({type:SET_FRIEND_OFFLINE,payload:id});
    }
  })
}
