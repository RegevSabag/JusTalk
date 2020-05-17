import '../App.css';
import React, {useState} from 'react';
import profile from '../images/profile.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actionAuth from '../store/actions/auth';
import { Redirect } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const Register = (props) => {
  const [img,setImg] = useState(profile);
  const [file,setFile] = useState(profile);
  const [formState,setFormState] = useState({name:'',email:'',password:''});
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated )
  const errors = useSelector(state => state.errors);
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();

  // Redirec if loggin
  if(isAuthenticated){
    return <Redirect to="/Home" />
  }

  const onChangeTextHandler = (e) =>{
    setFormState({...formState, [e.target.name]:e.target.value});
  }

  const updateFile = (e) => {
    setImg(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  }

  const register = () => {
    dispatch(actionAuth.register(file,formState))
  }

  return (
    <div style={styles.main_container}>
      <div style={styles.container}>
        <div style={styles.hiddenFileInputContainter}>
          <img alt='profile_image' style={styles.fileDownload} src={img}/>
          <input onChange={(e)=>{updateFile(e)}} type="file" name="fileUp" className="hidden" accept="image/*"/>
        </div>
        {errors.length?
          errors.map(val => {
            return <div key={val.id} style={styles.error_container}>{val.msg}</div>
          })
        :null}
        <div style={styles.container_inputs}>
          <input onChange={(e)=>onChangeTextHandler(e)} name='name' style={styles.input} type='text' placeholder='User name'/>
          <input onChange={(e)=>onChangeTextHandler(e)} name='email'  style={styles.input} type='email' placeholder='Email'/>
          <input onChange={(e)=>onChangeTextHandler(e)} name='password' style={styles.input} type='password' placeholder='Password'/>
        </div>
        <button className='buttonLogin' onClick={()=>{register()}} style={styles.button} >{loading? <Spinner animation="grow"/>:'Register'}</button>
        <Link style={styles.text} to="/Login">Allrady have account?</Link>
      </div>
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
    minHeight:'450px',
  },
  container_inputs:{
    display:'flex',
    alignItems:'center',
    flexDirection:'column',
    height:'20%',
    width:'100%',
    marginTop:'5px',
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
    marginTop:'50px',
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
  fileDownload:{
    height:'130px',
    width:'130px',
    padding: '0',
    display: 'inline-block', 
    verticalAlign: 'middle',
    margin: '0 4px 0 0',
    cursor: 'pointer',
    position: 'absolute',
    top: '0',
    left: '0',
  },
  hiddenFileInputContainter:{
    position: 'relative',
    display: 'inline-block',
    marginTop:'12px',
    height:'130px',
    width:'130px',
    borderRadius:'50%',
    overflow: 'hidden',
    verticalAlign: 'middle',
    cursor: 'pointer',
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

export default Register;