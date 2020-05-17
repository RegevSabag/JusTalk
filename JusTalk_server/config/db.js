const mongoose = require('mongoose');
const config = require('config');
const db_uri = config.get('mongoURI');

const connectDB = async () => {
  try{
    await mongoose.connect(db_uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true });
    console.log("MongoDB connect...");
  }
  catch(err){
    console.error(err.message);
    // exit process with faild
    process.exit(1);
  }
}

module.exports = connectDB;
