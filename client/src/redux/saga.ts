import { fork } from 'redux-saga/effects';
import { createNewRoomSaga, joinRoomSaga, secondUserCompletedFormSaga, listenIconClickSaga } from  '../socketConnection/emitSagas'
import { startStopChannel }  from '../socketConnection/connectSagas'

import { watchStartPlaying, watchPlayerGuess } from '../sagas/game-saga';
import secondUserJoinedHandler from '../socketConnection/handlers/secondUserJoined';


export default function* rootSaga() {
  yield fork(watchPlayerGuess)
  yield fork(startStopChannel)
  yield fork(watchStartPlaying)
  yield fork(createNewRoomSaga)
  yield fork(joinRoomSaga)
  yield fork(secondUserCompletedFormSaga)
  yield fork(listenIconClickSaga)
  yield fork(secondUserJoinedHandler)
  
}