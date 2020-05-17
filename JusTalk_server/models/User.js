const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  avatar:{
    data: Buffer,
    contentType: String
  },
  date:{
    type:Date,
    default:Date.now
  },
  groups:[
    {
      _id:false,
      group:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Groups',
      },
      notification:{
        type:mongoose.Schema.Types.Number,
        default:0
      }
    }
  ],
  friends:[
    {
      _id:false,
      user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
      },
      notification:{
        type:mongoose.Schema.Types.Number,
        default:0
      }
    }
  ],
},{minimize: false});

module.exports = User = mongoose.model('User',UserSchema);