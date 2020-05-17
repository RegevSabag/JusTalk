import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
//Pages 
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import * as actionAuth from './store/actions/auth';
import { SET_LOAD_USER } from './store/actions/types';

function App() {

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token)
      store.dispatch(actionAuth.loadUser(token));
    else
      store.dispatch({type:SET_LOAD_USER,payload:false})
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <div style={{width:'100%',height:'100vh',minHeight:'700px',minWidth:'500px'}}>
          <Switch>
            <Route exact path="/Login" component={Login}/>
            <Route exact path="/Register" component={Register}/>
            <PrivateRoute exact path='/Home' component={Home} />
            <PrivateRoute exact path='/*' component={Login} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
