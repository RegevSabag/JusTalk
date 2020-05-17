import { LOGIN_SUCCESS, SET_LOADING, ADD_FRIEND, LOG_OUT, SET_NOTIFICATION, DELETE_NOTIFICATION, SET_FRIEND_ONLINE, INIT_FRIENDS_ONLINE, SET_FRIEND_OFFLINE, DELETE_FRIEND, SET_LOAD_USER, ADD_GROUP} from '../actions/types';
import socketIOClient from 'socket.io-client';


const initionState = {
  loadUser:true,
  loading: false,
  user: false,
  isAuthenticated:false,
  socket:null,
};

export default function(state = initionState,action) {
  const { type, payload } = action;
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: payload
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loadUser:false,
        user:payload,
        isAuthenticated:true,
        socket:socketIOClient('http://localhost:4000/')
      }
    case ADD_FRIEND:
      state.user.friends = [...state.user.friends, payload];
      return{
        ...state,
      }
    case DELETE_FRIEND:
      state.user.friends = state.user.friends.filter(value => value.user._id !== payload);
      return{
        ...state,
      }
    case ADD_GROUP:
      state.user.groups = [...state.user.groups, {type:'group',value:payload}]
      return {
        ...state
      }
    case SET_NOTIFICATION:
      state.user.friends = state.user.friends.map(val=>{
        if(val.user._id === payload.id)
          val.notification = payload.number;
        return val;
      })
      return{
        ...state,
      }
    case DELETE_NOTIFICATION:
      state.user.friends = state.user.friends.map(val=>{
        if(val.user._id === payload)
          val.notification = 0;
        return val;
      })
      return{
        ...state
      }
    case INIT_FRIENDS_ONLINE:
      state.user.friends = state.user.friends.map(val=>{
        if(payload[val.user._id])
          val.user.online = true;
        return val;
      })
      return {
        ...state
      }
    case SET_FRIEND_ONLINE:
      state.user.friends = state.user.friends.map(val=>{
        if(val.user._id === payload)
          val.user.online = true;
        return val;
      })
      return {
        ...state
      }
    case SET_FRIEND_OFFLINE:
      state.user.friends = state.user.friends.map(val=>{
        if(val.user._id === payload)
        {
          val.user.online = false;
          val.user.date = new Date()
        }
        return val;
      })
      return {
        ...state
      }
    case SET_LOAD_USER:
      return {
        ...state,
        loadUser:payload
      }
    case LOG_OUT:
      return{
        loadUser:false,
        loading: false,
        user: false,
        isAuthenticated:false
      }
    default:
      return state
  }
}