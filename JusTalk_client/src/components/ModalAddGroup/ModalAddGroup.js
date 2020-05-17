import React,{useState} from 'react';
import { Modal, Spinner } from 'react-bootstrap'
import { useSelector, useDispatch} from 'react-redux'
import camera from '../../images/camera.jpg';
import { MdClose } from "react-icons/md";
import Item from './Item';
import * as actionGroup from '../../store/actions/groups'

export default (props) => {


  const [img,setImg] = useState(camera);
  const [file,setFile] = useState(camera);
  const [inputName,setInputName] = useState('');
  const [usersGroup,setUsersGroup] = useState([]);
  const friends = useSelector(state => state.auth.user.friends);
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();


  const updateFile = (e) => {
    setImg(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  }

  const handleClickAdd = (index) => {
    setUsersGroup([...usersGroup,friends[index]]);
  }

  const handleClickRemove = (index) => {
    setUsersGroup(usersGroup.filter((value,i) => i !== index));
  }

  const handleClickCreateGroup = () => {
    if(inputName.length === 0)
    {
      alert("name group can't be empty");
      return;
    }
    if(usersGroup.length === 0)
    {
      alert("you need choich min 1 person");
      return;
    }
    dispatch(actionGroup.createGroup(file,{name:inputName,people:usersGroup},props.handleClose))
  }

  const friends_render = friends.map((val,index) => {
    let flag = false;
    for( let i=0;i<usersGroup.length;i++)
    {
      if(usersGroup[i].user._id === val.user._id)
      {
        flag = true;
        break;
      }
    }
    if(!flag)
    {
      flag = false;
      return <Item key={index} handleClickAdd={()=>{handleClickAdd(index)}} name={val.user.name} avatar={val.user.avatar} itemAdd={false}/>
    }
    return null;
  })

  return (
    <Modal centered show={props.show} onHide={props.handleClose}>
      <Modal.Body style={{backgroundColor: '#181a1c',width:'100%',height:'75vh',minHeight:'500px',alingItems:'center'}}>
        { !loading?
        <div style={{flexDirection:'column',width:'100%',height:'100%',alingItems:'center'}}>
          <MdClose onClick={props.handleClose} style={{marginLeft:'7px',marginTop:'4px'}} size={22} color='white' />
          <div style={{flexDirection:'column',width:'100%',height:'100%',alingItems:'center'}}>
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
              <div style={styles.hiddenFileInputContainter}>
                <img alt='profile_image' style={styles.fileDownload} src={img}/>
                <input onChange={(e)=>{updateFile(e)}} type="file" name="fileUp" className="hidden" accept="image/*"/>
              </div>
              <div style={{marginTop:'20px',marginBottom:'20px',marginLeft:'20%',display:'flex',width:'60%',backgroundColor:'#202224',color:'white',padding:'2px',alignItems:'center',borderRadius:'5px'}}>
                <input onChange={(e) =>{setInputName(e.target.value) }} placeholder="Group-name" style={{textAlign:'center',color:'white',backgroundColor:'#202224',border:'none',fontSize:'15px',width:'100%'}} type='text'/>
              </div>
            </div>
            <div style={{borderRadius:'5px',display:'flex',flexDirection:'column',width:'100%',overflow:'scroll',height:'50%',marginTop:'5px'}} >
              <div style={{width:'100%',overflow:'scroll',height:'95%'}} >
                {
                  usersGroup.map((val,index) =>(
                    <Item key={index} handleClickRemove={()=>{handleClickRemove(index)}} name={val.user.name} avatar={val.user.avatar} itemAdd={true}/>
                  ))
                }
                {friends_render}
              </div>
            </div>
            <button onClick={()=>{handleClickCreateGroup()}} className='buttonAddGroup' style={styles.buttonAddGroup}>Create</button>
          </div>
        </div>
        :<div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Spinner style={{color:'white'}} animation="grow"/>
          </div>}
      </Modal.Body>
    </Modal>
  );
}

const styles = {
  fileDownload:{
    height:'80px',
    width:'80px',
    padding: '0',
    display: 'inline-block', 
    verticalAlign: 'middle',
    margin: '0 4px 0 0',
    cursor: 'pointer',
    position: 'absolute',
    top: '0',
    left: '0',
  },
  hiddenFileInputContainter:{
    position: 'relative',
    display: 'inline-block',
    height:'80px',
    width:'80px',
    borderRadius:'50%',
    overflow: 'hidden',
    verticalAlign: 'middle',
    cursor: 'pointer',
    marginLeft:'40%',
    backgroundColor:'#dfe6e9'
  },
  buttonAddGroup:{
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
    fontSize: '14px',
    cursor: 'pointer',
    width:'30%',
    height:'30px',
    borderRadius:'5px',
    marginTop:'5px',
    marginLeft:'35%'
  }
}