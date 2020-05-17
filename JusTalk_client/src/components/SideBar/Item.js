import '../../App.css';
import React from 'react';
import { capitalizeFirstLetter } from '../../utils'

const Item = (props) => {

  return(
    <div onClick={props.onClick} className='item' style={Object.assign({},styles.container_item,props.clicked?{backgroundColor:'#141414'}:{})}>
      <img alt="img" src={props.avatar} style={{marginLeft:'8%',width:'50px',height:'50px',borderRadius:'50%'}}/>
      <div style={{display:'flex',flexDirection:'column',marginLeft:'7%'}}>
        <p style={{textAlign:'center',margin:'0',fontSize:'17px',fontWeight:'400',color:'#ffffff',fontFamily:'Sen, sans-serif'}}>{capitalizeFirstLetter(props.name)}</p>
      </div>
      {
        props.notification?
        <div style={{fontSize:'14px',color:'white',justifyContent:'center',alignItems:'center',display:'flex',marginLeft: 'auto',marginRight:'5px',justifySelf:'end',width:'20px',height:'20px',backgroundColor:'#ee5253',borderRadius:'50%'}}>
          {props.notification}
        </div>
        :null
      }
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
    cursor:'pointer'
  },
  name_container:{
    display:'flex',
    
  }
}
export default Item;