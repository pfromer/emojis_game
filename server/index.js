const Koa = require('koa');
const socketIO = require('socket.io');

const app = new Koa();
const server = app.listen(3000);

const io = socketIO(server);
let i = 0;
let iconId = 0;

console.log('Server started');
setInterval(() => i++, 1000);

io.on("connection", (socket) => {
    console.log("Connection opened");
    setInterval(() => {
        socket.emit("oponentPlay", {
            iconId: iconId,
            playerId: 2,
            isCurrentPlayer: false
        });
        if (iconId == 58) {
            iconId = 0;
        } else {
            iconId++;
        }
        console.log('socket emited. icon id:', iconId);
    }, 800
    )

});
