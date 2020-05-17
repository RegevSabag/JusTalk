import axios from 'axios';
import { SET_MESSAGES, SET_LOADING,SET_NOTIFICATION,DELETE_NOTIFICATION,ADD_MESSAGE } from './types'
import * as actionUsers from './users';
import { URL } from '../../utils';

export const getMessagesById = (id, type) => async dispatch =>{
  dispatch({type:SET_LOADING, payload:true});
  if(type === 'friend')
  {
    const config = { headers: { 'Content-Type':'application/json' } };
    axios.get(URL+'api/message/getMessagesFirend/'+id ,config).then(response =>{
      dispatch({type:SET_MESSAGES, payload:response.data});
      dispatch({type:SET_LOADING, payload:false});
    }).catch(err => {
      console.log('error',err);
    })
  }
  else{
    const config = { headers: { 'Content-Type':'application/json' } };
    axios.get(URL+'api/message/getMessagesGroup/'+id ,config).then(response =>{
      dispatch({type:SET_MESSAGES, payload:response.data});
      dispatch({type:SET_LOADING, payload:false});
    }).catch(err => {
      console.log('error',err);
    })
  }
}

export const reciveMessageFromFriend = (data) => async (dispatch,getState) => {
    const clickedIndex = getState().allConversations.clickedIndex;
    const allConversations = getState().allConversations.allConversations;
    if(data.flag){
      if(clickedIndex !== null && allConversations[clickedIndex].type === 'friend' && allConversations[clickedIndex].value.user._id === data.from)
      {
        console.log("NOT NOTIFICATION")
        dispatch({type:ADD_MESSAGE,payload:{'from':data.from,'to':data.to,'msg':data.msg,'date':data.date}})
      }
      // add notification
      else{
        console.log("ADD NOTIFICATION")
        dispatch(addNotification(data,'friend'))
      }
    }
    else {
      console.log("ADD USER FROM SOCKET")
      // user thet a is not friend send message
      dispatch(actionUsers.addUserFromSocket(data.from));
    }
}

export const reciveMessageFromGroup = (data) => async (dispatch,getState) => {
  const clickedIndex = getState().allConversations.clickedIndex;
  const allConversations = getState().allConversations.allConversations;
  if(clickedIndex !== null && allConversations[clickedIndex].type === 'group' && allConversations[clickedIndex].value.group._id === data.to)
  {
    console.log("NOT NOTIFICATION")
    dispatch({type:ADD_MESSAGE,payload:{'from':data.from,'to':data.to,'msg':data.msg,'date':data.date}})
  }
  // add notification
  else{
    console.log("ADD NOTIFICATION")
    dispatch(addNotification(data,'group'))
  }
}

export const addNotification = (data,type) => async dispatch => {
  if(type === 'friend')
  {
    const config = { headers: { 'Content-Type':'application/json' } };
    axios.get(URL+'api/socket/addNotificationFriend/'+data.from ,config).then(response =>{
      dispatch({type:SET_NOTIFICATION, payload:{id:data.from,number:response.data.response}});
    }).catch(err => {
      console.log('error',err);
    })
  }
  else
  {
    const config = { headers: { 'Content-Type':'application/json' } };
    axios.get(URL+'api/socket/addNotificationGroup/'+data.to ,config).then(response =>{
      dispatch({type:SET_NOTIFICATION, payload:{id:data.to,number:response.data.response}});
    }).catch(err => {
      console.log('error',err);
    })
  }
}

export const deleteNotification = (id,type) => async dispatch => {
  if(type === 'friend')
  {
    const config = { headers: { 'Content-Type':'application/json' } };
    axios.get(URL+'api/socket/deleteNotificationFriend/'+id ,config).then(response =>{
      dispatch({type:DELETE_NOTIFICATION, payload:id});
    }).catch(err => {
      console.log('error',err);
    })
  }
  else
  {
    const config = { headers: { 'Content-Type':'application/json' } };
    axios.get(URL+'api/socket/deleteNotificationGroup/'+id ,config).then(response =>{
      dispatch({type:DELETE_NOTIFICATION, payload:id});
    }).catch(err => {
      console.log('error',err);
    })
  }
}




