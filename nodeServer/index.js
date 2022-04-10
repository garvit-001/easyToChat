// this node server will handle socket io Connection

const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });
const express = require('express');
const http = require('http');
// const io = require('socket.io')(8000);
// var socket = io.connect('http://sastaWhatsapp.com:3000/');
const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined' , name=>{
        console.log("New user" , name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });
    socket.on('send' , message =>{
        socket.broadcast.emit('receive' , {message: message , name: users[socket.id]})
    });
    socket.on('disconnect' , message =>{
        socket.broadcast.emit('left' ,  users[socket.id]);
        delete users[socket.id];
    }); 

})






// const io = require('socket.io')(8000, {
//     cors: {
//       origin: '*',
//     }
//   });
// const express = require('express');
// const cors = require('cors');
// const server = require("socket.io");
// const port = process.env.PORT;
// const app = express();
// const users = {};

// app.use(cors());

//  io.on('connection', socket=>{
//      socket.on('new-user-joined', name=>{
//          console.log("New user", name);
//          users[socket.id] = name;
//          socket.broadcast.emit('user-joined', name);
//      });

//      socket.on('send', message=>{
//          socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
//      });

//      socket.on('disconnect', message=>{
//         socket.broadcast.emit('left', users[socket.id]);
//         delete users[socket.id];
//     });
//  })

// //  server.listen(port , ()=>{
// //      console.log("listening to server");
// //  });
