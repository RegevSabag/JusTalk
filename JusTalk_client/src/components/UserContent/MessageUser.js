import React from 'react';


const MessageUser = (props) => {

  return (
    <div>
    <div style={Object.assign( {},styles.container,props.rightMsg?styles.messageRight:null)} >
      {props.msg}<br/>
      <span style={{color:'#545557',fontWeight:'100',fontSize:'12px'}}>{new Date(props.date).toLocaleTimeString().slice(0,-3)}</span>
    </div>
  </div>
  )
}

const styles = {
  container:{
    lineHeight: '125%',
    display:'inline-block',
    width:'auto',
    backgroundColor:'#92b979',
    borderRadius:'5px',
    maxWidth:'50%',
    paddingLeft:'4px',
    paddingRight:'4px',
    paddingBottom:'2px',
    paddingTop:'4px',
    marginLeft:'23px',
    marginTop:'14px',
    color:'white',
    fontSize:'17px'
  },
  messageRight:{
    float:'right',
    marginLeft:'0',
    marginRight:'23px',
    backgroundColor:'#4289ef',
  }
}

export default MessageUser;