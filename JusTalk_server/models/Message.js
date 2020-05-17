const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    msg:{
      type:String,
      required:true
    },
    from:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true,
    },
    to:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true
    },
    date:{
      type:Date,
      default:Date.now
    }
  });

module.exports = Message = mongoose.model('Messages',MessageSchema);
