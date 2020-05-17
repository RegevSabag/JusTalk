import React from 'react';
import { Route,Redirect } from 'react-router-dom';

import { useSelector } from 'react-redux';

const PrivateRoute = ({ component : Component , ...res}) => {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  return(
  <Route {...res} render={ props => !isAuthenticated ? 
    <Redirect to='/Login' />:<Component {...props} />} />
  )
}


export default PrivateRoute
