import React, { useState } from 'react';
import Item from './Item';
import { useSelector, useDispatch} from 'react-redux';
import Modal from '../ModalSearchUsers/Modal';
import { IoIosSearch } from 'react-icons/io';
import { FiPlus ,FiMenu } from 'react-icons/fi';
import { SET_CLICKED_INDEX } from '../../store/actions/types';
import MenuSideBar from '../MenuSideBar';
import * as actionMessages from '../../store/actions/messages';


const SideBar = (props) => {

  const [show, setShow] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState(null);
  const [toggle,setToggle] = useState(false);
  const clickedIndex = useSelector(state => state.allConversations.clickedIndex);
  const user = useSelector(state => state.auth.user);
  var allConversations = useSelector(state => state.allConversations.allConversations);
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();

  const conversations = allConversations.map((element,index) => {
    if(searchKeyword == null)
    {
      if(element.type === 'friend')
        return <Item notification={element.value.notification} avatar={element.value.user.avatar} name={element.value.user.name} key={index} clicked={clickedIndex === index?true:false} onClick={()=>{handleClickItem(index)}}/>
      else
        return <Item notification={element.value.notification} avatar={element.value.group.avatar} name={element.value.group.name} key={index} clicked={clickedIndex === index?true:false} onClick={()=>{handleClickItem(index)}}/>
    }
    else
    {
      if(element.type === 'friend')
      {
        if(element.value.user.name.toLowerCase().includes(searchKeyword.toLowerCase()))
          return <Item notification={element.value.notification} avatar={element.value.user.avatar} name={element.value.user.name} key={index} clicked={clickedIndex === index?true:false} onClick={()=>{handleClickItem(index)}}/>
      }
      else
      {
        if(element.value.group.name.toLowerCase().includes(searchKeyword.toLowerCase()))
          return <Item notification={element.value.notification} avatar={element.value.group.avatar} name={element.value.group.name} key={index} clicked={clickedIndex === index?true:false} onClick={()=>{handleClickItem(index)}}/>
      }
    }
    return null;
  })

  const handleClose = () => {
    if(!loading)
      setShow(false);
  }

  const handleShow = () => {
    setShow(true)
  };

  const handleClickItem = (index) => {
    if(allConversations[index].value.notification !== 0)
    {
      if(allConversations[index].type === 'friend')
        dispatch(actionMessages.deleteNotification(allConversations[index].value.user._id,'friend'));
      else
        dispatch(actionMessages.deleteNotification(allConversations[index].value.group._id,'group'));
    }
    dispatch({type:SET_CLICKED_INDEX,payload:index});
    if(allConversations[index].type === 'friend')
      dispatch(actionMessages.getMessagesById(allConversations[index].value.user._id,'friend'))
    else
      dispatch(actionMessages.getMessagesById(allConversations[index].value.group._id,'group'))
  };
  

  return (
    <div style={styles.sideBar_container}>
      <Modal show={show} handleClose={handleClose}/>
      <MenuSideBar toggle={toggle} setToggle={setToggle}/>
      <div style={{backgroundColor:'#181a1c',display:'flex',height:'10%',alignItems:'center' }}>
        <img alt="img" src={user.avatar} style={{marginLeft:'8%',width:'50px',height:'50px',borderRadius:'50%'}}/>
        <p style={{textAlign:'center',margin:'0',marginLeft:'5%',fontSize:'24px',fontWeight:'800',color:'#ffffff',fontFamily:'Sen, sans-serif'}}>Messages</p>
        <FiMenu onClick={() => setToggle(!toggle)} size={35} color='#545557'  style={{cursor:'pointer',display:'flex',justifySelf:'end',marginLeft: 'auto',marginRight:'5%'}}/>
      </div>
      <div style={{display:'flex',justifyContent:'center'}}>
        <div style={{display:'flex',width:'83%',borderRadius:'20px',backgroundColor:'#202224',color:'white',padding:'5px',alignItems:'center'}}>
          <IoIosSearch style={{marginLeft:'15px',marginRight:'3px'}} size={22} color='#545557'/>
          <input onChange={(e)=>{setSearchKeyword(e.target.value)}} placeholder="Search" style={{color:'white',backgroundColor:'#202224',border:'none',fontSize:'16',width:'80%'}} type='text'/>
        </div>
      </div>
      <div style={{display:'flex',flexDirection:'column',height:'70%',overflow: 'scroll',alignItems:'center',marginTop:'10px'}}>
        { conversations }
      </div>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}}>
        <div style={{border:'0.3px solid #202224',width:'90%'}}></div>
      </div>
      <div style={{display:'flex',height:'12%',alignItems:'center',justifyContent:'center'}}>
        <button className='buttonAddFriend' onClick={()=>{handleShow();}} style={styles.button} >
          <div style={{marginRight:'8px',display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'#232627',width:'42px',height:'42px',borderRadius:'50%'}}>
            <FiPlus size={25} color="white"/>
          </div>
          invite to messages
        </button>
      </div>
    </div>
  )
}

const styles = {
  sideBar_container: {
    width:'25%',
    height:'100%',
    minHeight:'600px',
    background:'#181a1c',
    minWidth:'250px',
    maxWidth:'22%',
    fontFamily:'Sen, sans-serif',
  },
  button:{
    fontWeight:'500',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    fontFamily:'Sen, sans-serif',
    padding:'3px',
    border: 'none',
    outline:'none',
    color: 'white',
    textAlign: 'center',
    textDecoration: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    width:'85%',
    height:'65px',
    borderRadius:'5px'
  },
}

export default SideBar;