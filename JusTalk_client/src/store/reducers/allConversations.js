import { INIT_ALL_CONVERSATIONS ,SET_CLICKED_INDEX, INIT_FRIENDS_ONLINE ,SET_FRIEND_ONLINE, SET_FRIEND_OFFLINE, ADD_FRIEND, DELETE_FRIEND, SET_NOTIFICATION, DELETE_NOTIFICATION, LOG_OUT, ADD_GROUP, DELETE_GROUP, USER_LEAVE_GROUP } from '../actions/types';



const initionState = {
  allConversations:[],
  clickedIndex:null
};

export default function(state = initionState,action) {
  const { type, payload } = action;

  switch (type) {
    case INIT_ALL_CONVERSATIONS:
      return {
        ...state,
        allConversations:payload
      }
    case SET_CLICKED_INDEX:
      return {
        ...state,
        clickedIndex:payload
      }
    case INIT_FRIENDS_ONLINE:
      state.allConversations = state.allConversations.map(conversation=>{
        if(conversation.type === 'friend' && payload[conversation.value.user._id])
        conversation.value.user.online = true;
        return conversation;
      })
      return {
        ...state
      }
    case SET_FRIEND_ONLINE:
      state.allConversations = state.allConversations.map(conversation=>{
        if(conversation.type === 'friend' && conversation.value.user._id === payload)
          conversation.value.user.online = true;
        return conversation;
      })
      return{
        ...state
      }
    case SET_FRIEND_OFFLINE:
      state.allConversations = state.allConversations.map(conversation=>{
        if(conversation.type === 'friend' && conversation.value.user._id === payload)
        {
          conversation.value.user.online = false;
          conversation.value.user.date = new Date()
        }
        return conversation;
      })
      return {
        ...state
      }
    case ADD_FRIEND:
      state.allConversations = [...state.allConversations, {type:'friend',value:payload}];
      return{
        ...state,
      }
    case DELETE_FRIEND:
      state.allConversations = state.allConversations.filter(conversation => {
        if(conversation.type === 'friend' && conversation.value.user._id === payload){
          return null;
        }
        else
          return conversation;
      });
      return{
        ...state
      }
    case ADD_GROUP:
      state.allConversations = [...state.allConversations, {type:'group',value:payload}]
      return {
        ...state
      }
    case DELETE_GROUP:
      state.allConversations = state.allConversations.filter(conversation => {
        if(conversation.type === 'group' && conversation.value.group._id === payload){
          return null;
        }
        else
          return conversation;
      });
      return {
        ...state
      }
    case USER_LEAVE_GROUP:
      state.allConversations = state.allConversations.filter(conversation => {
        if(conversation.type === 'group' && conversation.value.group._id === payload.groupId)
        {
          conversation.value.group.people = conversation.value.group.people.filter(value => value._id !== payload.userId);
        }
        return conversation;
      });
      return {
        ...state
      }
    case SET_NOTIFICATION:
      var first_item;
      var first_item_index;
      state.allConversations = state.allConversations.filter((conversation, index) => {
        if(conversation.type === 'friend' && conversation.value.user._id === payload.id)
        {
          conversation.value.notification = payload.number;
          first_item = conversation;
          first_item_index = index;
          return null;
        }
        if(conversation.type === 'group' && conversation.value.group._id === payload.id)
        {
          conversation.value.notification = payload.number;
          first_item = conversation;
          first_item_index = index;
          return null;
        }
        return conversation;
      })
      state.allConversations = [first_item,...state.allConversations]
      if( state.clickedIndex !== null && state.clickedIndex < first_item_index )
      {
        state.clickedIndex += 1;
      }
      return{
        ...state
      }
    case DELETE_NOTIFICATION:
      state.allConversations = state.allConversations.map(conversation=>{
        if(conversation.type === 'friend' && conversation.value.user._id === payload)
          conversation.value.notification = 0;
        if(conversation.type === 'group' && conversation.value.group._id === payload)
          conversation.value.notification = 0;
        return conversation;
      })
      return {
        ...state
      }
    case LOG_OUT:
      return{
        allConversations:[],
        clickedIndex:null
      }
    default:
      return state
  }
}