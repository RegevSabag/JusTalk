import axios from 'axios';

export const URL = 'http://localhost:4000/';

export function setAuthToken(token){
  if(token){
    axios.defaults.headers.common['x-auth-token'] = token;
  }
  else{
    delete axios.defaults.headers.common['x-auth-token'];
  }
}

export function arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => binary += String.fromCharCode(b));
  return window.btoa(binary);
};

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export function compare( a, b ) {
  if ( a.value.notification < b.value.notification ){
    return 1;
  }
  if ( a.value.notification > b.value.notification ){
    return -1;
  }
  return 0;
};

