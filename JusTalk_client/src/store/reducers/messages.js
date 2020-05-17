import { SET_MESSAGES, ADD_MESSAGE, LOG_OUT } from '../actions/types';


const initionState = [];

export default function(state = initionState,action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGES:
      return payload
    case ADD_MESSAGE:
      return [...state,payload]
    case LOG_OUT:
      return []
    default:
      return state
  }
}