import { SET_ERROR, REMOVE_ERROR } from '../actions/types';

const initionState = [];

export default function(state = initionState,action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ERROR:
      return [ ...state, payload ];

    case REMOVE_ERROR:
      return state.filter(alert => alert.id !== payload);
      
    default:
      return state
  }
}