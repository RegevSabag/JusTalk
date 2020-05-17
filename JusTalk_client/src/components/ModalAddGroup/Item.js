import '../../App.css';
import React from 'react';
import {IoMdAddCircle, IoIosRemoveCircle} from 'react-icons/io';

const Item = (props) => {

  return(
    <div onClick={()=>{props.itemAdd?props.handleClickRemove():props.handleClickAdd()}} className='item' style={styles.container_item}>
      <div style={{width:'80%',display:'flex',alignItems:'center'}}>
        <img alt="img" src={props.avatar} style={{marginLeft:'5%',width:'50px',height:'50px',borderRadius:'50%'}}/>
        <p style={{marginTop:'5px',marginLeft:'10%',textAlign:'center',fontSize:'22px',fontWeight:'400',color:'#ffffff',fontFamily:'Sen, sans-serif'}}>{props.name}</p>
      </div>
      {props.itemAdd?<IoIosRemoveCircle size={25} color='#de5d59' style={{marginRight:'6%'}} />:<IoMdAddCircle size={25} color='#81a75b' style={{marginRight:'6%'}}/>}
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