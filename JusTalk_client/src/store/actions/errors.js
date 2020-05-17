import { SET_ERROR, REMOVE_ERROR } from './types';
import { v4 as uuidv4 } from 'uuid';


export const setError = (msg, timeout) => dispatch =>{
  const id = uuidv4();
  dispatch({ type:SET_ERROR, payload:{msg,id} });

  setTimeout(() => {
    dispatch({ type:REMOVE_ERROR, payload:id });
  },timeout);
}