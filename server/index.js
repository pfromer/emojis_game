const Koa = require('koa');
const socketIO = require('socket.io');

const app = new Koa();
const server = app.listen(3000);

const io = socketIO(server);
let i = 0;
let iconId = 0;

let rooms = [];


const randomOrder = () => {
  const orderedCardNumbers = [...Array(56).keys()].map(x => x + 1)
  const result = [];
  for (let i = 0; i < 56; i++) {
    let n = Math.floor((Math.random() * orderedCardNumbers.length));
    let cardNumber = orderedCardNumbers[n];
    orderedCardNumbers.splice(n, 1);
    result.push(cardNumber);
  }
  return result;
}

console.log('Server started');

io.on("connection", (socket) => {
    // once a client has connected, we expect to get a ping from them saying what room they want to join
    /*socket.on('room', function(room) {
      socket.join(room)
      console.log('server room ', room)
      io.to(room).emit('new-message', room);
    });*/

    socket.on('join_room', function(payload) {
      socket.join(payload.room)
      console.log('join room', payload)
      io.to(payload.room).emit('join_room', payload);
    });

    socket.on('second_user_joined', function(payload) {
      let room = payload.room
      console.log('second_user_joined payload ', payload)
      io.to(room).emit('second_user_joined', {secondUserName : payload.secondUserName, randomOrder : randomOrder()});
    })

});
