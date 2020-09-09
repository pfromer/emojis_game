import * as io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { take, call, put, fork, race, cancelled, delay } from 'redux-saga/effects';
import { createSelector } from 'reselect';

const ADD_TASK = 'ADD_TASK';
const START_CHANNEL = 'START_CHANNEL';
const STOP_CHANNEL = 'STOP_CHANNEL';
const CHANNEL_ON = 'CHANNEL_ON';
const CHANNEL_OFF = 'CHANNEL_OFF';
const SERVER_ON = 'SERVER_ON';
const SERVER_OFF = 'SERVER_OFF';

const socketServerURL = 'http://localhost:3000';

const initialState = {
  taskList: [],
  channelStatus: 'off',
  serverStatus: 'unknown',
};

export default (state = initialState, action) => {
  const { taskList } = state;
  const updatedTaskList = [...taskList, action.payload];
  switch (action.type) {
    case CHANNEL_ON:
      return { ...state, channelStatus: 'on' };
    case CHANNEL_OFF:
      return { ...state, channelStatus: 'off', serverStatus: 'unknown' };
    case ADD_TASK:
      return { ...state, taskList: updatedTaskList };
    case SERVER_OFF:
      return { ...state, serverStatus: 'off' };
    case SERVER_ON:
      return { ...state, serverStatus: 'on' };
    default:
      return state;
  }
};

// action creators for Stop and Start buttons. You can also put them into componentDidMount
export const startChannel = () => ({ type: START_CHANNEL });
export const stopChannel = () => ({ type: STOP_CHANNEL });

// sorting function to show the latest tasks first
const sortTasks = (task1, task2) => task2.taskID - task1.taskID;

// selector to get only first 5 latest tasks
const taskSelector = state => state.taskReducer.taskList;
const topTask = allTasks => allTasks.sort(sortTasks).slice(0, 5);
export const topTaskSelector = createSelector(taskSelector, topTask);

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
  const handler = (data) => {
    emit(data);
  };

  //decimos que cada vez que al socket le llegue un "newTask"
  //se tiene que "emitir" esa tarea en este canal
  socket.on('newTask', handler);

  //ver la documentacion de eventChannel. la funcion subscriptora debe 
  //devolver una funcion que haga que el canal no esuche mas al evento "newTask"
  return () => {
    socket.off('newTask', handler);
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
    //el socke se conecta. el middleware es el encargado de esperar a que la promise
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
      yield put({ type: ADD_TASK, payload });
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

// saga listens for start and stop actions
export const startStopChannel = function* () {
  while (true) {
    yield take(START_CHANNEL);
    yield race({
      task: call(listenServerSaga),
      cancel: take(STOP_CHANNEL),
    });
  }
};