import '../../App.css';
import React from 'react';
import {IoMdPersonAdd} from 'react-icons/io';

const Item = (props) => {

  return(
    <div onClick={props.onClick} className='item' style={styles.container_item}>
      <div style={{width:'80%',display:'flex',alignItems:'center'}}>
        <img alt="img" src={props.avatar} style={{marginLeft:'5%',width:'50px',height:'50px',borderRadius:'50%'}}/>
        <p style={{marginTop:'5px',marginLeft:'10%',textAlign:'center',fontSize:'22px',fontWeight:'400',color:'#ffffff',fontFamily:'Sen, sans-serif'}}>{props.name}</p>
      </div>
      <IoMdPersonAdd size={25} color='white' style={{marginRight:'6%'}}/>
    </div>
  )
}

const styles = {   
  container_item:{
    display:'flex',
    marginTop:'10px',
    height:'70px',
    width:'90%',
    borderRadius:'6px',
    alignItems: 'center',
    minHeight:'70px',
    marginLeft:'5%',
    justifyContent:'space-between',
    cursor:'pointer'
  }
}
export default Item;