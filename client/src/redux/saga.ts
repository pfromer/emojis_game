import { all } from 'redux-saga/effects';
import { startStopChannel } from '../ducks/task';
import { watchStartPlaying } from '../sagas/game-saga';

export default function* rootSaga() {
  yield all([
    startStopChannel(),
    watchStartPlaying()
  ]);
}
