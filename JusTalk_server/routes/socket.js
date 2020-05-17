const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const User = require('../models/User');
const Group = require('../models/Group');
const auth = require('../middleware/auth');
const fs = require('fs');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './public/');
  },
  filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, fileName)
  }
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});



let users = {};
module.exports = function(io) {

  io.on('connection', function (socket) {
    
    socket.on('user_connect',function(data,fn){
      console.log('EVENT => USER_CONNECT');
      users[data] = socket.id;
      fn(users);
      socket.broadcast.emit('user_connected',data);
      console.log(users);
    })

    socket.on('disconnect', async function() {
      console.log('EVENT => DISCONNECT');
      for(const key in users)
      {
        if(users[key] === socket.id)
        {
          socket.broadcast.emit('user_disconnected',key);
          var user = await User.findOne({_id:key});
          user.date = new Date();
          await user.save();
          delete users[key];
        }
      }
      console.log(users);
   });

   socket.on('send_msg_friend', async function(data){
     console.log('EVENT => SEND_MSG_FRIEND');
     try{
      const { msg, to, from, date} = data;
      const message = new Message({ msg, from, to, date});
      await message.save();
      const user = await User.findOne({_id:to});
      var flag = false;
      user.friends.forEach((element,index) => {
        if(element.user == from)
        {
          flag = true
        }
      });
      data.flag = flag;
      if(flag){
        // user exisst
        if(users[to])
        {
          // if user is online
          io.to(users[data.to]).emit('recive_message_from_friend', data);
        }
        else{
          user.friends.forEach(elem =>{
            if(elem.user == from){
              elem.notification += 1;
            }
          })
          user.save();
        }
      }
      else{
        // user not exisst
        if(users[to])
        {
          // if user is online
          io.to(users[data.to]).emit('recive_message_from_friend', data);
        }
        else{
          user.friends.push({'user':from,notification:1});
          await user.save();
        }
      }
    }
    catch(err){
      console.log(err);
    }
   })

   socket.on('send_msg_group', async function(data){
    console.log('EVENT => SEND_MSG_GROUP');
    try{
     const { msg, to, from, date} = data;
     const message = new Message({ msg, from, to, date});
     await message.save();
     var group = await Group.findOne({_id:to}).populate('people','-password -groups -friends -email -__v');
     for( const people of group.people)
     {
       // if user online
       if(users[people._id] && people._id != from)
       {
        io.to(users[people._id]).emit('recive_message_from_group', data);
       }
       // user offline
       else
       {
        var user = await User.findOne({_id:people._id});
        for(var group of user.groups)
        {
          if(user._id == from)
            continue;
          if(group.group._id == to)
          {
            group.notification += 1;
          }
        }
        await user.save();
       }
     }
   }
   catch(err){
     console.log(err);
   }
  })
   
  });

  router.get('/addNotificationFriend/:id',auth, async (req,res) => {
    try{
      var user = await User.findOne({_id:req.user.id});
      var response = null;
      user.friends.forEach(elem =>{
        if(elem.user._id == req.params.id)
        {
          elem.notification += 1;
          response = elem.notification;
        }
      })
      user.save();
      res.send({response});
    }
    catch(err){
      console.log(err);
    }
  })

  router.get('/deleteNotificationFriend/:id',auth, async (req,res) => {
    try{
      var user = await User.findOne({_id:req.user.id});
      user.friends.forEach(elem =>{
        if(elem.user._id == req.params.id)
        {
          elem.notification = 0;
        }
      })
      user.save();
      res.send('seccess');
    }
    catch(err){
      console.log(err);
    }
  })

  router.get('/addNotificationGroup/:id',auth, async (req,res) => {
    try{
      var user = await User.findOne({_id:req.user.id});
      var response = null;
      user.groups.forEach(elem =>{
        if(elem.group._id == req.params.id)
        {
          elem.notification += 1;
          response = elem.notification;
        }
      })
      user.save();
      res.send({response});
    }
    catch(err){
      console.log(err);
    }
  })

  router.get('/deleteNotificationGroup/:id',auth, async (req,res) => {
    try{
      var user = await User.findOne({_id:req.user.id});
      user.groups.forEach(elem =>{
        if(elem.group == req.params.id)
        {
          elem.notification = 0;
        }
      })
      user.save();
      res.send('seccess');
    }
    catch(err){
      console.log(err);
    }
  })

  router.post('/createGroup',[upload.single('file'),auth],async (req,res) =>{
    var {name, people } = req.body;
    people = JSON.parse(people);
    var arr_ids = [];
    people.forEach(elm =>{
      arr_ids.push(elm.user._id);
    })
    arr_ids.push(req.user.id);
    try{
      var group = new Group({ name,people:arr_ids});
      var group_id;
      group.avatar.data = fs.readFileSync(req.file?req.file.path:'public/group.png');
      group.avatar.contentType = 'image/jpeg';
      await group.save();
      group_id = group._id;
      group = await Group.findById(group_id).populate('people','-password -groups -friends -email -__v');
      for(const id of arr_ids)
      {
        var user = await User.findById(id);
        user.groups.push({group:group_id});
        await user.save();
        if(req.user.id !== id)
          io.to(users[id]).emit('join_group', group);
      }
      res.send(group);
    }
    catch(err){
      console.log(err);
    }
  })

  router.delete('/exitGroup/:id',auth,async (req,res) =>{
    try{
      var user = await User.findOne({_id:req.user.id});
      user.groups = user.groups.filter(value => value.group != req.params.id);
      await user.save();
      var group = await Group.findOne({_id:req.params.id});
      group.people = group.people.filter(value => {
        if(value != req.user.id)
        {
          io.to(users[value]).emit('leave_group', {groupId:req.params.id,userId:req.user.id});
          return value;
        }
        else
          return null;
      });
      await group.save();
      res.send('seccess');
    }
    catch(err){
      console.log(err);
    }
  })


  return router;
}