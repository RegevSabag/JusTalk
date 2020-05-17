const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    name:{
      type:mongoose.Schema.Types.String
    },
    people:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true
    }],
    avatar:{
      data: Buffer,
      contentType: String
    },
    date:{
      type:Date,
      default:Date.now
    }
  });

module.exports = Group = mongoose.model('Groups',GroupSchema);
