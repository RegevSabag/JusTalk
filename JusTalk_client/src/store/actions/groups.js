import axios from 'axios';
import { ADD_GROUP, SET_LOADING, DELETE_GROUP, SET_CLICKED_INDEX, USER_LEAVE_GROUP } from '../actions/types';
import {arrayBufferToBase64} from '../../utils';
import { URL } from '../../utils';

// Create group
export const createGroup = (file, {name,people},callBack) => async dispatch =>{
  dispatch({ type:SET_LOADING, payload:true});
  const config = { headers: { 'Content-Type': 'multipart/form-data'} };
  var bodyFormData = new FormData();
  bodyFormData.append('file', file);
  bodyFormData.set('name',name);
  bodyFormData.append("people",JSON.stringify(people));
  axios.post(URL+'api/socket/createGroup',bodyFormData,config).then(response =>{
    var base64Flag = 'data:image/jpeg;base64,';
    var imageStr = arrayBufferToBase64(response.data.avatar.data.data)
    response.data.avatar = base64Flag + imageStr;
    for(var user of response.data.people)
    {
      imageStr = arrayBufferToBase64(user.avatar.data.data)
      user.avatar = base64Flag + imageStr;
    }
    console.log(response.data);
    dispatch({type:ADD_GROUP, payload:{notification:0,group:response.data}})
    dispatch({ type:SET_LOADING, payload:false});   
    callBack();
  }).catch(err => {
    console.log('error');
  })
}

export const addGroup = (data) => async dispatch =>{
  var base64Flag = 'data:image/jpeg;base64,';
    var imageStr = arrayBufferToBase64(data.avatar.data.data)
    data.avatar = base64Flag + imageStr;
    for(var user of data.people)
    {
      imageStr = arrayBufferToBase64(user.avatar.data.data)
      user.avatar = base64Flag + imageStr;
    }
    dispatch({type:ADD_GROUP, payload:{notification:0,group:data}})
}

export const exitGroup = (id) => async dispatch =>{
  dispatch({ type:SET_LOADING, payload:true});
  const config = { headers: { 'Content-Type':'application/json' } };
  axios.delete(URL+'api/socket/exitGroup/'+id ,config).then(response =>{
    dispatch({type:SET_CLICKED_INDEX, payload:null});
    dispatch({type:DELETE_GROUP, payload:id});
    dispatch({ type:SET_LOADING, payload:false});
  }).catch(err => {
    console.log('error',err);
  })
}

export const userLeaveGroup = (data) => async dispatch =>{
  dispatch({type:USER_LEAVE_GROUP, payload:data});
}