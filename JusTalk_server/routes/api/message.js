const express = require('express');
const router = express.Router();
const Message = require('../../models/Message');
const auth = require('../../middleware/auth');



// @route   POST api/message
// @desc    send message
// @access  Private
router.post('/sendMessage', auth, async (req,res) => {
  const { msg, to} = req.body;
  const message = new Message({ msg, from:req.user.id, to});
  message.save();
  console.log(message);
  res.send('Seccess')
});

// @route   GET api/message
// @desc    get messages by id Friend
// @access  Private
router.get('/getMessagesFirend/:id', auth, async (req,res) => {
  Message.find({from:{$in:[req.user.id, req.params.id]}, to:{$in:[req.user.id, req.params.id]}}).then(response =>{
    res.send(response);
  }).catch(err =>{
    console.log('ERROR => ',err);
  })
});

// @route   GET api/message
// @desc    get messages by id Group
// @access  Private
router.get('/getMessagesGroup/:id', auth, async (req,res) => {
  Message.find({to:req.params.id}).then(response =>{
    res.send(response);
  }).catch(err =>{
    console.log('ERROR => ',err);
  })
});

module.exports = router;