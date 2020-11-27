import { fork } from 'redux-saga/effects';
import { startStopChannel } from '../ducks/socketReducer';
import { computerPlay, watchPlayerGuess } from '../sagas/game-saga';


export default function* rootSaga() {
  yield fork(watchPlayerGuess)
  yield fork(startStopChannel)
  yield fork(computerPlay)
  // code after fork-effect
}