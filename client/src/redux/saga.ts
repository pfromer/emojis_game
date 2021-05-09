import { fork } from 'redux-saga/effects';
import { startStopChannel, createNewRoomSaga, joinRoomSaga, secondUserCompletedFormSaga, listenIconClickSaga } from '../ducks/socketReducer';
import { watchStartPlaying, watchPlayerGuess } from '../sagas/game-saga';


export default function* rootSaga() {
  yield fork(watchPlayerGuess)
  yield fork(startStopChannel)
  yield fork(watchStartPlaying)
  yield fork(createNewRoomSaga)
  yield fork(joinRoomSaga)
  yield fork(secondUserCompletedFormSaga)
  yield fork(listenIconClickSaga)
  
  
  // code after fork-effect
}