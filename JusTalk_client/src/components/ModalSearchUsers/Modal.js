import React,{useState} from 'react';
import { Modal,Spinner } from 'react-bootstrap'
import { useSelector, useDispatch} from 'react-redux'
import * as actionUsers from '../../store/actions/users';
import Item from './Item';
import { IoIosSearch } from 'react-icons/io';


export default (props) => {

  const [searchKeyword, setSearchKeyword] = useState(null);
  const loading = useSelector(state => state.auth.loading);
  const users = useSelector(state => state.users.users);
  const friends = useSelector(state => state.auth.user.friends);
  const dispatch = useDispatch();

  const handleOnPressItem = (id) => {
    console.log(id);
    dispatch(actionUsers.addUser(id,props.handleClose))
  }
  
  const users_render = users.map((val,index) => {
    let flag = false;
    for( let i=0;i<friends.length;i++)
    {
      if(friends[i].user._id === val._id)
      {
        flag = true;
        break;
      }
    }
    if(!flag)
    {
      flag = false;
      return <Item onClick={()=>{handleOnPressItem(val._id)}} key={val._id} name={val.name} avatar={val.avatar}/>
    }
    return null;
  })

  return (
    <Modal centered show={props.show} onHide={props.handleClose}>
      <Modal.Body style={{backgroundColor: '#181a1c',width:'100%',height:'60vh',alingItems:'center'}}>
      {
        loading?
          <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Spinner style={{color:'white'}} animation="grow"/>
          </div>:
          <div style={{width:'100%',height:'100%'}}>
            <div style={{display:'flex',justifyContent:'center',marginBottom:'10px'}}>
              <div style={{display:'flex',width:'83%',borderRadius:'20px',backgroundColor:'#202224',color:'white',padding:'5px',alignItems:'center'}}>
                <IoIosSearch style={{marginLeft:'15px',marginRight:'3px'}} size={22} color='#545557'/>
                <input onChange={(e)=>{setSearchKeyword(e.target.value)}} placeholder="Search" style={{color:'white',backgroundColor:'#202224',border:'none',fontSize:'16',width:'80%'}} type='text'/>
              </div>
            </div>
            <div style={{display:'flex',flexDirection:'column',width:'100%',overflow:'scroll',height:'90%'}} >
              {users_render.filter(value =>{
                if(searchKeyword == null)
                  return value;
                else if(value && value.props.name.toLowerCase().includes(searchKeyword.toLowerCase()))
                  return value;
                return null;
              })}
            </div>
          </div>
      }
      </Modal.Body>
    </Modal>
  );
}