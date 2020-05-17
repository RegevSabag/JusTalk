import { combineReducers } from 'redux';
import auth from './auth';
import errors from './errors';
import users from './users';
import messages from './messages';
import allConversations from './allConversations'
export default combineReducers({ auth, errors, users, messages, allConversations});