import React from 'react';
import { MdClose } from "react-icons/md";
import { capitalizeFirstLetter } from '../../utils';
import * as actionUser from '../../store/actions/users';
import { useDispatch } from 'react-redux';

const InfoSideBar = (props) => {

  const dispatch = useDispatch();

  return (
    <div style={ Object.assign( {},styles.MenuSideBar,props.toggle? {visibility: 'visible'}: {visibility: 'hidden'} ) }>
      <MdClose onClick={()=>{props.setToggle(false)}} style={{marginLeft:'7px',marginTop:'4px'}} size={22} color='white' />
      <div style={{width:'100%',display:'flex',alignItems: 'center',flexDirection: 'column'}}>
        <img alt='avatar' style={{marginTop:'15px',width:'120px',height:'120px',borderRadius:'50%'}} src={props.user.avatar}/>
        <p style={{fontSize:'28px',fontWeight:'500',color:'white',textAlign:'center'}}>{capitalizeFirstLetter(props.user.name)}</p>
        <span style={{color:'white',marginBottom:'10px'}}>
          {props.user.online?
            <div style={{display:'flex',alignItems:'center'}}>
              <div style={{width:'13px',height:'13px',backgroundColor:'#05c46b',borderRadius:'50%',marginRight:'5px',marginTop:'2px'}}></div> 
              <span style={{fontSize:'18px'}}>online</span>
            </div>
            :<span style={{fontSize:'16px'}}>last seen at {new Date(props.user.date).toLocaleString()}</span>
          }
        </span>
        <button className='buttonLogout' style={styles.button} onClick={()=>{dispatch(actionUser.deleteUser(props.user._id));props.setToggle(false)}}>Delete user</button>
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
  button:{
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
}

export default InfoSideBar;