const Koa = require('koa');
const socketIO = require('socket.io');

const app = new Koa();
const server = app.listen(process.env.PORT);

const io = socketIO(server);
let i = 0;
let iconId = 0;

let rooms = [];


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

console.log('Server started');

io.on("connection", (socket) => {
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
