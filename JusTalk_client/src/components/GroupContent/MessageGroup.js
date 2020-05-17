import React from 'react';
import { capitalizeFirstLetter } from '../../utils';

const MessageGroup = (props) => {

  if(props.rightMsg)
  {
    return (
      <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
        <div style={styles.containerRight} >
          <span style={{color:'#545557',fontWeight:'600',fontSize:'12px'}}>{capitalizeFirstLetter(props.name)}</span><br/>
          {props.msg}<br/>
          <span style={{color:'#545557',fontWeight:'100',fontSize:'12px'}}>{new Date(props.date).toLocaleTimeString().slice(0,-3)}</span>
        </div>
        <img alt="avatar" style={{width:'45px',height:'45px',borderRadius:'50%',marginRight:'24px',marginTop:'11px'}} src={props.avatar}/>
      </div>
    )
  }
  else{
    return (
      <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
        <img alt="avatar" style={{width:'45px',height:'45px',borderRadius:'50%',marginLeft:'24px',marginTop:'11px'}} src={props.avatar}/>
        <div style={styles.containerLeft} >
          <span style={{color:'#545557',fontWeight:'600',fontSize:'12px'}}>{capitalizeFirstLetter(props.name)}</span><br/>
          {props.msg}<br/>
          <span style={{color:'#545557',fontWeight:'100',fontSize:'12px'}}>{new Date(props.date).toLocaleTimeString().slice(0,-3)}</span>
        </div>
      </div>
    )
  }
}

const styles = {
  containerLeft:{
    lineHeight: '125%',
    backgroundColor:'#92b979',
    borderRadius:'5px',
    maxWidth:'50%',
    paddingLeft:'4px',
    paddingRight:'4px',
    paddingBottom:'2px',
    paddingTop:'1px',
    marginTop:'14px',
    marginLeft:'7px',
    color:'white',
    fontSize:'17px'
  },
  containerRight:{
    lineHeight: '125%',
    backgroundColor:'#4289ef',
    borderRadius:'5px',
    maxWidth:'50%',
    paddingLeft:'4px',
    paddingRight:'4px',
    paddingBottom:'2px',
    paddingTop:'1px',
    marginTop:'14px',
    marginRight:'7px',
    color:'white',
    fontSize:'17px'
  }

}

export default MessageGroup;