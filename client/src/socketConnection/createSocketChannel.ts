import { eventChannel } from 'redux-saga';
// This is how channel is created
export const createSocketChannel = socket => eventChannel((emit) => {
    const handler = (messageType) => (data) => {
        emit({data : data, messageType : messageType});
    };

    //decimos que cada vez que al socket le llegue un "newTask"
    //se tiene que "emitir" esa tarea en este canal

    let messageTypes = ['join_room', 'second_user_joined', 'player_click', 'state_update'];
    messageTypes.forEach(messageType => socket.on(messageType, handler(messageType)))

    //ver la documentacion de eventChannel. la funcion subscriptora debe
    //devolver una funcion que haga que el canal no esuche mas al evento "newTask"
    return () => {
        messageTypes.forEach(messageType => socket.off(messageType, handler(messageType)))
    };
});