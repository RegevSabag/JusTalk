const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const cors = require('cors');
const connectDB = require('./config/db');
const socketIo = require("socket.io")(server,{cookie: false});

//Middleware
app.use(express.json({extended:false}));//bodyParser
app.use('/public', express.static('public'));
app.use(cors());

//Connect DB
connectDB();

//Define Routes
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/users',require('./routes/api/users'));
app.use('/api/message',require('./routes/api/message'));
app.use('/api/socket',require('./routes/socket')(socketIo))


const PORT = process.env.PORT || 4000;
server.listen(PORT,()=>console.log(`Server started on port : ${PORT}`));
