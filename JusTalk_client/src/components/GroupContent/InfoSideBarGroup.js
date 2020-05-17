import React from 'react';
import { MdClose } from "react-icons/md";
import { capitalizeFirstLetter } from '../../utils';
import * as actionGroup from '../../store/actions/groups';
import { useDispatch} from 'react-redux';


const InfoSideBarGroup = (props) => {

  const dispatch = useDispatch();

  const handleExitGroup =  () =>{
    dispatch(actionGroup.exitGroup(props.group._id));
    props.setToggle(false);
  }
  return (
    <div style={ Object.assign( {},styles.MenuSideBar,props.toggle? {visibility: 'visible'}: {visibility: 'hidden'} ) }>
      <MdClose onClick={()=>{props.setToggle(false)}} style={{marginLeft:'7px',marginTop:'4px'}} size={22} color='white' />
      <div style={{width:'100%',display:'flex',alignItems: 'center',flexDirection: 'column'}}>
        <img alt='avatar' style={{marginTop:'15px',width:'120px',height:'120px',borderRadius:'50%'}} src={props.group.avatar}/>
        <p style={{fontSize:'28px',fontWeight:'500',color:'white',textAlign:'center'}}>{capitalizeFirstLetter(props.group.name)}</p>
        <div style={{width:'100%',height:'40%',overflow:'scroll',marginBottom:'25px'}}>
          {
            props.group.people.map(element =>(
              <div key={element._id} style={{display:'flex',alignItems:'center',padding:'7px'}}>
                <img alt="avatar" style={{width:'50px',height:'50px',borderRadius:'50%',marginLeft:'7px'}} src={element.avatar}/>
                <span style={{color:'white',marginLeft:'7px'}}>{capitalizeFirstLetter(element.name)}</span>
              </div>
            ))
          }
        </div>
        <button className='buttonLogout' style={styles.button} onClick={()=>{handleExitGroup()}}>Exit group</button>
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

export default InfoSideBarGroup;