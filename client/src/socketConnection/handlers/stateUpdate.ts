import { all, put, select } from "redux-saga/effects";
import { lastActionsIndexSelector } from "../selectors";

export default function* stateUpdateHandler(payload) {
    let lastActionIndex =  yield select(lastActionsIndexSelector)
    yield all(payload.data.actions.slice(Math.max(lastActionIndex + 1,1), payload.data.actions.length).map(action => put({ 
      type: 'PLAYER_GUESS',
      playerId: action.playerId,
      iconId: action.iconId,
      cardId: action.cardId,
    })));
    yield put({
      type: 'UPDATE_LAST_ACTION_INDEX',
      lastActionIndex: payload.data.actions.length - 1
    })
}