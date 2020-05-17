import '../App.css';
import React, {useState} from 'react';
import Logo from '../images/Logo-JusTalk_B.png';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import * as actionAuth from '../store/actions/auth';
import { Spinner } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

const Login = (props) => {

  const dispatch = useDispatch();
  const [formState,setFormState] = useState({email:'',password:''});
  const loading = useSelector(state => state.auth.loading);
  const loadUser = useSelector(state => state.auth.loadUser);
  const errors = useSelector(state => state.errors);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated )

  // Redirec if loggin
  if(isAuthenticated){
    return <Redirect to="/Home" />
  }

  const onChangeTextHandler = (e) =>{
    setFormState({...formState, [e.target.name]:e.target.value});
  }

  const HandleLogin = () => {
    dispatch(actionAuth.login(formState.email,formState.password)); 
  }

  return (
    <div style={styles.main_container}>
      {loadUser?<div><Spinner style={{color:'white'}} animation="grow"/></div>:
      <div style={styles.container}>
        <img style={styles.logo} alt='logo' src={Logo}/>
        {errors.length?
          errors.map(val => {
            return <div key={val.id} style={styles.error_container}>{val.msg}</div>
          })
        :null}
        <div style={styles.container_inputs}>
          <input onChange={(e)=>{onChangeTextHandler(e)}} name='email'  style={styles.input} type='email' placeholder='Email'/>
          <input onChange={(e)=>{onChangeTextHandler(e)}} name='password' style={styles.input} type='password' placeholder='Password'/>
        </div>
        <button className='buttonLogin' onClick={()=>{HandleLogin()}} style={styles.button} >{loading? <Spinner animation="grow"/>:"Login"}</button>
        <Link style={styles.text} to="/Register">Don't have at account?</Link>
      </div>
      }
    </div>
  )
}

const styles = {
  main_container: {
    display:'flex',
    width:'100%',
    height:'100vh',
    background:'#121416',
    justifyContent:'center',
    alignItems:'center',
    minHeight:'600px'
  },
  container: {
    display:'flex',
    borderRadius:'3px',
    background:'#282c2d',
    flexDirection:'column',
    alignItems:'center',
    width:'30%',
    height:'60%',
    minWidth:'400px',
    minHeight:'400px',
  },
  logo: {
    marginTop:'30px',
    height:'150px',
  },
  container_inputs:{
    display:'flex',
    alignItems:'center',
    flexDirection:'column',
    height:'20%',
    width:'100%',
    marginTop:'15px',
  },
  input:{
    marginTop:'12px',
    padding:'2px',
    paddingLeft: '10px',
    backgroundColor:'#f1f2f6',
    display:'flex',
    border:'none',
    fontSize: '16px',
    outline:'none',
    width:'50%',
    minWidth:'300px',
    maxWidth:'423px',
    color:'black',
  },
  button:{
    marginTop:'22px',
    fontWeight: '300px',
    padding:'3px',
    border: 'none',
    outline:'none',
    color: 'white',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '19px',
    cursor: 'pointer',
    width:'50%',
    minWidth:'300px',
    maxWidth:'423px',
  },
  text:{
    color:'#ffffff',
    marginTop:'10px'
  },
  error_container:{
    marginTop:'5px',
    display:'flex',
    color:'white',
    alignItems:'center',
    justifyContent:'center',
    width:'73%',
    height:'30px',
    backgroundColor:'#ff7675'
  }
}

export default Login;