
import * as io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { take, call, put, fork, race, cancelled, delay, select } from 'redux-saga/effects';
import { Card } from '../types/game';

const START_CHANNEL = 'START_CHANNEL';
const STOP_CHANNEL = 'STOP_CHANNEL';
const CHANNEL_ON = 'CHANNEL_ON';
const CHANNEL_OFF = 'CHANNEL_OFF';
const SERVER_ON = 'SERVER_ON';
const SERVER_OFF = 'SERVER_OFF';
const CREATE_NEW_ROOM = 'CREATE_NEW_ROOM';
const SET_ROOM = 'SET_ROOM';
const JOIN_ROOM = 'JOIN_ROOM';
const SECOND_USER_JOINED = 'SECOND_USER_JOINED';
const SECOND_USER_COMPLETED_FORM = 'SECOND_USER_COMPLETED_FORM';


const socketServerURL = 'http://localhost:3000';

const initialState = {
  channelStatus: 'off',
  serverStatus: 'unknown',
  room : null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANNEL_ON:
      return { ...state, channelStatus: 'on' };
    case CHANNEL_OFF:
      return { ...state, channelStatus: 'off', serverStatus: 'unknown' };
    case SERVER_OFF:
      return { ...state, serverStatus: 'off' };
    case SERVER_ON:
      return { ...state, serverStatus: 'on' };
    case SET_ROOM:
      return { ...state, room: action.room };
    default:
      return state;
  }
};

// action creators for Stop and Start buttons. You can also put them into componentDidMount
export const startChannel = () => ({ type: START_CHANNEL });
export const stopChannel = () => ({ type: STOP_CHANNEL });
export const createNewRoom = () => ({ type: CREATE_NEW_ROOM  });
export const joinRoom = () => ({ type: JOIN_ROOM  });


// wrapping functions for socket events (connect, disconnect, reconnect)
let socket;
const connect = () => {
  socket = io(socketServerURL);
  return new Promise((resolve) => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
};

const disconnect = () => {
  socket = io(socketServerURL);
  return new Promise((resolve) => {
    socket.on('disconnect', () => {
      resolve(socket);
    });
  });
};

const reconnect = () => {
  socket = io(socketServerURL);
  return new Promise((resolve) => {
    socket.on('reconnect', () => {
      resolve(socket);
    });
  });
};

// This is how channel is created
const createSocketChannel = socket => eventChannel((emit) => {
  const handler = (messageType) => (data) => {
    emit({data : data, messageType : messageType});
  };

  //decimos que cada vez que al socket le llegue un "newTask"
  //se tiene que "emitir" esa tarea en este canal

  let messageTypes = ['join_room', 'second_user_joined'];
  messageTypes.forEach(messageType => socket.on(messageType, handler(messageType)))

  //ver la documentacion de eventChannel. la funcion subscriptora debe
  //devolver una funcion que haga que el canal no esuche mas al evento "newTask"
  return () => {
    messageTypes.forEach(messageType => socket.off(messageType, handler(messageType)))
  };
});

// connection monitoring sagas
const listenDisconnectSaga = function* () {
  while (true) {
    yield call(disconnect);
    //entender que esta linea se va a ejecutar solo cuando resuelva la
    //promise del disconet, es decir solo cuando el socket se desconecte
    yield put({ type: SERVER_OFF });
  }
};

const listenConnectSaga = function* () {
  while (true) {
    yield call(reconnect);
    //entender que esta linea se va a ejecutar solo cuando resuelva la
    //promise del reconnect, es decir solo cuando el socket conecte
    yield put({ type: SERVER_ON });
  }
};

// Saga to switch on channel.
const listenServerSaga = function* () {
  try {
    yield put({ type: CHANNEL_ON });

    //en este primer paso me fijo si el server esta up o down
    //si est down va a ganar el timeout
    const { timeout } = yield race({
      connected: call(connect),
      timeout: delay(2000),
    });
    if (timeout) {
      yield put({ type: SERVER_OFF });
    }

    //hay algo que no entiendo. que pasa si el server esta up y justo despues de que gano el conected
    //el server pasa a estar down?

    //call connect devuelve una promise que se resuelve cuando
    //el socket se conecta. el middleware es el encargado de esperar a que la promise
    //resuelva y dejar en la variable socket el socket
    const socket = yield call(connect);

    //creamos el canal por medio de la funcion de redux-saga eventChannel
    //ahora todas las nuevas tareas que lleguen al socket se van a emitir al canal
    const socketChannel = yield call(createSocketChannel, socket);

    //estar atento a si algun momento se desconecta la saga
    yield fork(listenDisconnectSaga);

    //estar atento a si se reconecta
    yield fork(listenConnectSaga);

    //en este hilo de ejecucion decimos que el server esta on
    yield put({ type: SERVER_ON });

    while (true) {
      //escuchamos todo el tiempo las tareas que se emiten por el canal
      const payload = yield take(socketChannel);
      //enviamos las tareas al reducer
      console.log("message-received", payload);

      switch(payload.messageType) {
        case("second_user_joined") :
          yield put({ type: "BUILD_DECK", randomOrder : payload.data.randomOrder });
          const isFirstUser = yield select(isFirstUserSelector)
          if(isFirstUser) {
            yield put({ 
              type: 'ADD_PLAYER',
              id: 2,
              name: payload.data.secondUserName,
              isCurrentPlayer: false
            })
          }
          yield put({ type: "START_PLAYING" });
          let allCards = yield select(allCardsSelector);

          for (let i = 0; i < allCards.length; i++) {
              yield put({ type: 'SHARE_CARD', cardId: allCards[i].id });
              yield delay(10)
          }
          
          break;
        default:
          break;
      }

      //yield put({ type: 'PLAYER_GUESS', playerId: payload.playerId, iconId: payload.iconId, isCurrentPlayer: payload.isCurrentPlayer });
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (yield cancelled()) {
      socket.disconnect(true);
      yield put({ type: CHANNEL_OFF });
    }
  }
};

export const startStopChannel = function* () {
  while (true) {
    yield take(START_CHANNEL);
    yield race({
      task: call(listenServerSaga),
      cancel: take(STOP_CHANNEL),
    });
  }
};

export const createNewRoomSaga = function* () {
  while (true) {
    yield take(CREATE_NEW_ROOM);
    const socket = yield call(connect);
    const room = yield Math.random().toString().replace('.','')
    yield put({ type: SET_ROOM, room : room });
    console.log("creating new room ", room)
    const selfName = yield select(firstPlayerNameSelector)
    socket.emit('join_room', {room: room, user_name : selfName});
    window.location.pathname = 'first_user/' + room + '/' + selfName
  }
};

// saga listens for start and stop actions
export const joinRoomSaga = function* () {
  while (true) {
    yield take(JOIN_ROOM);
    const socket = yield call(connect);
    const room = yield select(roomSelector)
    console.log("joining room ", room)
    socket.emit('join_room', {room: room, user_name : "unknown"});
  }
};

// saga listens for start and stop actions
export const secondUserCompletedFormSaga = function* () {
  while (true) {
    yield take(SECOND_USER_COMPLETED_FORM);
    const socket = yield call(connect);
    const selfName = yield select(secondPlayerNameSelector)
    const room = yield select(roomSelector)
    socket.emit('second_user_joined', { secondUserName : selfName, room : room});
  }
};

const roomSelector = (state): string => (state.socketReducer.room)
const firstPlayerNameSelector = (state): string => (state.gameReducer.players[0].name)
const secondPlayerNameSelector = (state): string => (state.gameReducer.players[1].name)
const isFirstUserSelector = (state): string => (state.gameReducer.isFirstUser)
const allCardsSelector = (state): [Card] => state.gameReducer.allCards.sort(function (x, y) { return x.index < y.index ? -1 : 1 })
