import Koa from 'koa'
import socketIO from 'socket.io'
import cors from'@koa/cors'
const app = new Koa();
import cards from './cards.js'

var options = {
  origin: '*'
};

app.use(cors(options));
const server = app.listen(3000);

const io = socketIO.listen(server);

let rooms = {};

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

io.on("connection", (socket) => {
    socket.on('join_room', function(payload) {
      socket.join(payload.room)
      if(!rooms[payload.room]) {
        rooms[payload.room] = {
          actions : []
        }
      }
      io.to(payload.room).emit('join_room', payload);
    });

    socket.on('second_user_joined', function(payload) {
      const rand = randomOrder()
      io.to(payload.room).emit('second_user_joined', {secondUserName : payload.secondUserName, randomOrder : rand});

      rooms[payload.room].actions.push({
        playerId: -1,
        cardId: rand[0],
      })
      
      setTimeout(function(){
        io.sockets.clients(payload.room).forEach(function(s){
          s.leave(payload.room);
        })
        delete rooms[payload.room]
      }, 1000*3600)
      
      if(rooms[payload.room]) {
        io.to(payload.room).emit('state_update', {actions : rooms[payload.room].actions} );
      }

    })

    socket.on('state_update', function(payload) {
      if(rooms[payload.room]) {
        io.to(payload.room).emit('state_update', {actions : rooms[payload.room].actions} );
      }
    })

    socket.on('player_click', function(payload) {
      if(rooms[payload.room]) {
        var lastCardId = rooms[payload.room].actions[rooms[payload.room].actions.length - 1].cardId + 1
        if(cards.filter(c => c.id == lastCardId)[0].icons.includes(payload.iconId) && payload.cardId != lastCardId) {
          rooms[payload.room].actions.push(
            {
              playerId: payload.playerId,
              cardId: payload.cardId -1,
              iconId: payload.iconId
            }
          )
        }
        if(rooms[payload.room]) {
          io.to(payload.room).emit('state_update', {actions : rooms[payload.room].actions} );
        }
      }
    })
});
