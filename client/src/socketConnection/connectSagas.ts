// wrapping functions for socket events (connect, disconnect, reconnect)

import { put, select, take, race } from "redux-saga/effects";
import { call } from 'redux-saga/effects';
import { SERVER_OFF, SERVER_ON, START_CHANNEL, STOP_CHANNEL } from "./reducer";
import { listenChannelSaga } from "./listenChannelSaga";
import { roomSelector } from "./selectors";
import * as io from 'socket.io-client';

const socketServerURL = process.env.SOCKET_SERVER_URL;

let socket;
export const connect = () => {
  socket = io(socketServerURL);
  return new Promise((resolve) => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
};

export const disconnect = () => {
  socket = io(socketServerURL);
  return new Promise((resolve) => {
    socket.on('disconnect', () => {
      resolve(socket);
    });
  });
};

export const reconnect = () => {
  socket = io(socketServerURL);
  return new Promise((resolve) => {
    socket.on('reconnect', () => {
      resolve(socket);
    });
  });
};

// connection monitoring sagas
export const listenDisconnectSaga = function* () {
  while (true) {
    yield call(disconnect);
    //entender que esta linea se va a ejecutar solo cuando resuelva la
    //promise del disconet, es decir solo cuando el socket se desconecte
    yield put({ type: SERVER_OFF });
  }
};

export const listenConnectSaga = function* () {
  while (true) {
    const socket = yield call(reconnect);
    //entender que esta linea se va a ejecutar solo cuando resuelva la
    //promise del reconnect, es decir solo cuando el socket conecte
    const room = yield select(roomSelector)
    socket.emit('state_update', {room : room});
    yield put({ type: SERVER_ON });
  }
};

export const startStopChannel = function* () {
  while (true) {
    yield take(START_CHANNEL);
    yield race({
      task: call(listenChannelSaga),
      cancel: take(STOP_CHANNEL),
    });
  }
};

export const getSocket = function () {
    return socket
}