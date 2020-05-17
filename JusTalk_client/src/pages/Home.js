import React, {useState,useEffect} from 'react';
import SideBar from '../components/SideBar/SideBar';
import { useSelector,useDispatch } from 'react-redux'
import * as actionMessages from '../store/actions/messages';
import * as actionUsers from '../store/actions/users';
import * as actionGroup from '../store/actions/groups';
import {INIT_FRIENDS_ONLINE } from '../store/actions/types';
import InfoSideBar from '../components/UserContent/InfoSideBar';
import InfoSideBarGroup from '../components/GroupContent/InfoSideBarGroup';
import UserContent from '../components/UserContent/UserContent';
import GroupContent from '../components/GroupContent/GroupContent';

const Home = (props) => {
  
  const [toggle,setToggle] = useState(false);
  const clickedIndex = useSelector(state => state.allConversations.clickedIndex);
  const allConversations = useSelector(state => state.allConversations.allConversations);
  const user_id = useSelector(state => state.auth.user._id);
  const socket = useSelector(state => state.auth.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if(socket){
    socket.emit('user_connect',user_id,function(data){
      dispatch({type:INIT_FRIENDS_ONLINE, payload:data});
    });

    socket.on('user_connected',function(data){
      dispatch(actionUsers.setFriendOnline(data));
    })

    socket.on('user_disconnected',function(data){
      dispatch(actionUsers.setFriendOffline(data));
    })

    socket.on('recive_message_from_friend',function(data){
      dispatch(actionMessages.reciveMessageFromFriend(data));
    })

    socket.on('recive_message_from_group',function(data){
      dispatch(actionMessages.reciveMessageFromGroup(data));
    })

    socket.on('join_group',function(data){
      dispatch(actionGroup.addGroup(data));
    })
  
    socket.on('leave_group',function(data){
      console.log('LEAVE GROUP: ',data);
      dispatch(actionGroup.userLeaveGroup(data));
    })
  }
  },[socket,user_id,dispatch])

    return(
      <div style={styles.main_container}>
      <div style={styles.container}>
        <SideBar/>
        { clickedIndex !== null && allConversations[clickedIndex].type === 'friend'?
          <InfoSideBar user={allConversations[clickedIndex].value.user} toggle={toggle} setToggle={setToggle}/>
          :clickedIndex !== null? <InfoSideBarGroup group={allConversations[clickedIndex].value.group} toggle={toggle} setToggle={setToggle} />
          :null
        }
        { clickedIndex !== null && allConversations[clickedIndex].type === 'friend'? 
          <UserContent setToggle={setToggle}/>
          :clickedIndex !== null? <GroupContent setToggle={setToggle}/>
          :null 
        }
      </div>
    </div>
    )
  }


const styles = {
  main_container: {
    display:'flex',
    width:'100%',
    height:'100%',
    backgroundColor:'#121416',
    flexDirection: 'column',
    fontFamily:'Sen, sans-serif',
  },
  container: {
    display:'flex',
    width:'100%',
    height:'100%',
    flexDirection:'row'
  }
}

export default Home;