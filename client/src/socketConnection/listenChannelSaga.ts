
import { take, call, put, fork, race, cancelled, delay } from 'redux-saga/effects';
import { CHANNEL_ON, SERVER_OFF, CHANNEL_OFF, SERVER_ON } from './reducer';
import { createSocketChannel } from './createSocketChannel';
import { connect, getSocket, listenConnectSaga, listenDisconnectSaga } from './connectSagas';
import secondUserJoinedHandler from './handlers/secondUserJoined';
import playerClickedHandler from './handlers/playerClick';
import stateUpdateHandler from './handlers/stateUpdate';

// Saga to switch on channel.
export const listenChannelSaga = function* () {
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
            yield call(secondUserJoinedHandler, payload)
            break;
          case("player_click") :
            yield call(playerClickedHandler, payload)
            break;
          case("state_update") :
            yield call(stateUpdateHandler, payload)
            break;
          default:
            break;
        }
  
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (yield cancelled()) {
        getSocket().disconnect(true);
        yield put({ type: CHANNEL_OFF });
      }
    }
  };

