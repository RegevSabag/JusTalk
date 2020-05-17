import React, {useState,useEffect,useRef} from 'react';
import { useSelector,useDispatch } from 'react-redux'
import { IoMdSend , IoMdMore } from 'react-icons/io';
import {MdInsertEmoticon} from "react-icons/md";
import {ADD_MESSAGE } from '../../store/actions/types';
import MessageUser from './MessageUser';
import { Spinner } from 'react-bootstrap';
import { capitalizeFirstLetter } from '../../utils';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

const UserContent = (props) => {

  var refMessageContainer = useRef(null);
  const [inputMessage, setInputMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const messages = useSelector(state => state.messages);
  const clickedIndex = useSelector(state => state.allConversations.clickedIndex);
  const allConversations = useSelector(state => state.allConversations.allConversations);
  const loading = useSelector(state => state.auth.loading);
  const user_id = useSelector(state => state.auth.user._id);
  const socket = useSelector(state => state.auth.socket);
  const dispatch = useDispatch();

  const messagesRender = messages.map((val,index) =>{
    if(val.from === user_id)
    {
      if(index === 0)
      {
        return (
        <div key={index}>
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'3px'}}>
            <span style={{paddingRight:'3px',paddingLeft:'3px',display:'inline-block',width:'auto',backgroundColor:'#202224',borderRadius:'5px',color:'#545557'}}>{new Date(val.date).toDateString()}</span>
          </div>
          <MessageUser msg={val.msg} date={val.date}/>
        </div>
        )
      }
      else
      {
        if(new Date(messages[index - 1].date).toDateString() !== new Date(val.date).toDateString())
        {
          return (
            <div key={index}>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'3px'}}>
              <span style={{paddingRight:'3px',paddingLeft:'3px',display:'inline-block',width:'auto',backgroundColor:'#202224',borderRadius:'5px',color:'#545557'}}>{new Date(val.date).toDateString()}</span>
            </div>
              <MessageUser msg={val.msg} date={val.date}/>
            </div>)
        }
        else 
        {
          return <MessageUser key={index} msg={val.msg} date={val.date}/>
        }
      }
    }
    else
    {
      if(index === 0)
      {
        return (
        <div key={index}>
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'3px'}}>
            <span style={{paddingRight:'3px',paddingLeft:'3px',display:'inline-block',width:'auto',backgroundColor:'#202224',borderRadius:'5px',color:'#545557'}}>{new Date(val.date).toDateString()}</span>
          </div>
          <MessageUser rightMsg={true} msg={val.msg} date={val.date}/>
        </div>
        )
      }
      else
      {
        if(new Date(messages[index - 1].date).toDateString() !== new Date(val.date).toDateString())
        {
          return (
            <div key={index} >
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'3px'}}>
              <span style={{paddingRight:'3px',paddingLeft:'3px',display:'inline-block',width:'auto',backgroundColor:'#202224',borderRadius:'5px',color:'#545557'}}>{new Date(val.date).toDateString()}</span>
            </div>              
            <MessageUser rightMsg={true} msg={val.msg} date={val.date}/>
            </div>)
        }
        else 
        {
          return <MessageUser rightMsg={true} key={index} msg={val.msg} date={val.date}/>
        }
      }
    }
  })

  const handleSendMessage = () => { 
    if(inputMessage !== '')
    {
      dispatch({type:ADD_MESSAGE,payload:{'from':user_id,'to':allConversations[clickedIndex].value.user._id,'msg':inputMessage,'date':new Date()}})
      setInputMessage('');
      socket.emit('send_msg_friend',{'from':user_id,'to':allConversations[clickedIndex].value.user._id,'msg':inputMessage,'date':new Date()});
    }
    else{
      alert("Can't send empy message");
    }
  }

  const handlePressEnter = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  }

  const selectEmoji = (e) => {
    setInputMessage(inputMessage + e.native);
    setShowEmoji(false);
  }

  useEffect(() => {
    if (!refMessageContainer.current) 
      return;
    refMessageContainer.current.scrollTop = 9999;
  })


  return(
    <div style={styles.chat_container}>
    <div style={{display:'flex',width:'100%',height:'10%',minHeight:'50px',flexDirection:'row',alignItems:'center',borderBottom:'0.3px solid #202224'}}>
      <img alt='avatar' style={{marginLeft:'3%',width:'50px',height:'50px',borderRadius:'50%'}} src={allConversations[clickedIndex].value.user.avatar}/>
      <div style={{marginLeft:'2%',width:'100%',display:'flex',flexDirection:'column'}}>
        <span style={{fontWeight:'400',color:'white',fontSize:'22px'}}>{capitalizeFirstLetter(allConversations[clickedIndex].value.user.name)}</span>
        <span style={{color:'white',fontSize:'16px'}}>
          {allConversations[clickedIndex].value.user.online?
            <div style={{display:'flex',alignItems:'center'}}>
              <div style={{width:'11px',height:'11px',backgroundColor:'#05c46b',borderRadius:'50%',marginRight:'5px',marginTop:'2px'}}></div> 
              <span style={{fontSize:'16px'}}>online</span>
            </div>
            :<span style={{fontSize:'14px',textAlign:'center',}}>last seen at {new Date(allConversations[clickedIndex].value.user.date).toLocaleString()}</span>
          }
        </span>
      </div>
      <IoMdMore onClick={()=>{props.setToggle(true)}} color='#545557' size={30} style={{display:'flex',justifySelf:'end',marginLeft: 'auto',marginRight:'15px'}} />
    </div>
    <div ref={refMessageContainer} id="myDiv" style={{display:'flex',height:'80%',overflow:'scroll',flexDirection:'column'}}>
      {!loading?
        messagesRender
        :<div style={{height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}><Spinner style={{color:'white'}} animation="grow"/></div>
      }
    </div>
    {showEmoji?
    <span style={{position:'absolute',bottom:'66px',right:'3%'}}>
      <Picker color={'#4e8be8'} title='Pick your emoji…' emoji='point_up' theme={'dark'} onSelect={selectEmoji} />
    </span>:null
    }
    <div style={{display:'flex',width:'100%',height:'10%',justifyContent:'center',alignItems:'center'}}>
      <div style={{display:'flex',width:'93%',height:'50%',borderRadius:'20px',backgroundColor:'#202224',color:'white',alignItems:'center'}}>
        <input onKeyDown={(e)=>{handlePressEnter(e)}} value={inputMessage} onChange={(e)=>{setInputMessage(e.target.value)}} placeholder="Type a message" style={{marginLeft:'15px',color:'white',backgroundColor:'#202224',border:'none',fontSize:'17px',width:'95%'}} type='text'/>
        <MdInsertEmoticon onClick={() => setShowEmoji(!showEmoji)} style={{marginRight:'5px'}} size={22} color='#545557'/>
        <IoMdSend onClick={() => handleSendMessage()} style={{marginRight:'5px'}} size={22} color='#545557'/>
      </div>
    </div>
  </div>
  )
}


const styles = {
  chat_container: { 
    width:'78%',
    minWidth:'250px',
    height:'100%',
    backgroundColor:'#121416'
  }
}

export default UserContent
