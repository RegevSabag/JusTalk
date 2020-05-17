import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdClose } from "react-icons/md";
import { capitalizeFirstLetter } from '../utils';
import * as actionAuth from '../store/actions/auth';
import ModalAddGroup from './ModalAddGroup/ModalAddGroup';

const MenuSideBar = (props) => {

  const [show, setShow] = useState(false);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  return (
    <div style={ Object.assign( {},styles.MenuSideBar,props.toggle? {visibility: 'visible'}: {visibility: 'hidden'} ) }>
      <ModalAddGroup show={show} handleClose={()=>{setShow(false)}}/>
      <MdClose onClick={()=>{props.setToggle(false)}} style={{marginLeft:'7px',marginTop:'4px'}} size={22} color='white' />
      <div style={{width:'100%',display:'flex',alignItems: 'center',flexDirection: 'column'}}>
        <img alt='avatar' style={{marginTop:'15px',width:'120px',height:'120px',borderRadius:'50%'}} src={user.avatar}/>
        <p style={{fontSize:'28px',fontWeight:'500',color:'white',textAlign:'center'}}>{capitalizeFirstLetter(user.name)}</p>
        <button className='buttonAddGroup' style={styles.buttonAddGroup} onClick={()=>{setShow(true)}}>Create group</button>
        <button className='buttonLogout' style={styles.buttonLogOut} onClick={()=>{dispatch(actionAuth.logOut())}}>Log-out</button>
      </div>
    </div>
  )
}

const styles = {
  MenuSideBar: {
    position: 'absolute',
    flexDirection:'column',
    display:'flex',
    width:'250px',
    maxWidth:'250px',
    height:'100vh',
    background:'#1e1e1e',
    right:'0',
    top:'0',
  },
  buttonLogOut:{
    fontWeight:'500',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    fontFamily:'Sen, sans-serif',
    border: 'none',
    outline:'none',
    color: 'white',
    textAlign: 'center',
    textDecoration: 'none',
    fontSize: '17px',
    cursor: 'pointer',
    width:'85%',
    height:'50px',
    borderRadius:'5px'
  },
  buttonAddGroup:{
    fontWeight:'500',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    fontFamily:'Sen, sans-serif',
    border: 'none',
    outline:'none',
    color: 'white',
    textAlign: 'center',
    textDecoration: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    width:'80%',
    height:'30px',
    borderRadius:'5px',
    marginTop:'5px',
    marginBottom:'20px'
  }
}

export default MenuSideBar;