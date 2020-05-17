import { INIT_USERS,LOG_OUT } from '../actions/types';


const initionState = {
  users:[],
};

export default function(state = initionState,action) {
  const { type, payload } = action;

  switch (type) {
    case INIT_USERS:
      return {
        ...state,
        users:payload
      }
    case LOG_OUT:
      return{
        users:[],
      }
    default:
      return state
  }
}