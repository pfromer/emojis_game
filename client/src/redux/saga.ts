import { fork } from 'redux-saga/effects';
import { startStopChannel, createNewRoomSaga, joinRoomSaga, secondUserCompletedFormSaga } from '../ducks/socketReducer';
import { watchStartPlaying, watchPlayerGuess } from '../sagas/game-saga';


export default function* rootSaga() {
  yield fork(watchPlayerGuess)
  yield fork(startStopChannel)
  yield fork(watchStartPlaying)
  yield fork(createNewRoomSaga)
  yield fork(joinRoomSaga)
  yield fork(secondUserCompletedFormSaga)
  
  // code after fork-effect
}