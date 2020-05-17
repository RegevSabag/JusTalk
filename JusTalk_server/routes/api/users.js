const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');



// @route   GET users/
// @desc    Get all users
// @access  Private
router.get('/',auth, async (req,res) => {
  try{
    User.find({ _id: { $nin: req.user.id } }).select('-password').then(response => {
      res.json(response);
    }).catch(err => {
      console.error(err.message);
      res.status(400).send('Server error');
    })
  }
  catch(err){
    console.error(err.message);
    res.status(500).send('Server error');
  }
})


// @route   PUT users/:id
// @desc    Add friend by id
// @access  Private
router.put('/:id',auth, async (req,res) => {
  try{
    console.log('id: ',req.params.id);
    var user = await User.findOne({_id:req.user.id});
    user.friends.push({'user':req.params.id});
    await user.save();
    user = await User.findOne({_id:req.params.id}).select('-password -friends -groups -__v');
    res.send({user});
  }
  catch(err){
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

// @route   DELETE users/:id
// @desc    Delete friend by id
// @access  Private
router.delete('/:id',auth, async (req,res) => {
  try{
    console.log('Delete id: ',req.params.id);
    var user = await User.findOne({_id:req.user.id});
    user.friends = user.friends.filter(value => value.user != req.params.id);
    await user.save();
    res.send('seccess');
  }
  catch(err){
    console.error(err.message);
    res.status(500).send('Server error');
  }
})



module.exports = router;
