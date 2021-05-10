const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .use(cors())
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

  const io = socketIO(server);

  const randomOrder = () => {
    const orderedCardNumbers = [...Array(54).keys()].map(x => x + 1)
    const result = [];
    for (let i = 0; i < 54; i++) {
      let n = Math.floor((Math.random() * orderedCardNumbers.length));
      let cardNumber = orderedCardNumbers[n];
      orderedCardNumbers.splice(n, 1);
      result.push(cardNumber);
    }
    return result;
  }

  io.on('connection', (socket) => {
    socket.on('join_room', function(payload) {
      socket.join(payload.room)
      console.log('join room', payload)
      io.to(payload.room).emit('join_room', payload);
    });

    socket.on('second_user_joined', function(payload) {
      console.log('second_user_joined payload ', payload)
      io.to(payload.room).emit('second_user_joined', {secondUserName : payload.secondUserName, randomOrder : randomOrder()});
    })

    socket.on('player_click', function(payload) {
      console.log('player_click ', payload)
      io.to(payload.room).emit('player_click', payload);
    })
  });

