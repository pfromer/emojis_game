import { all, put, select, call } from "redux-saga/effects";
import { lastActionsIndexSelector } from "../selectors";
import secondUserJoinedHandler from "./secondUserJoined";

export default function* stateUpdateHandler(payload) {
    let lastActionIndex =  yield select(lastActionsIndexSelector)

    const actions = payload.data.actions.slice(Math.max(lastActionIndex + 1,0), payload.data.actions.length)

    for(var i = 0; i < actions.length; i++) {
      switch(actions[i].type) {
        case("second_user_joined") :
          debugger
          yield put({
            type: 'SECOND_USER_JOINED',
            randomOrder: actions[i].randomOrder,
            secondUserName: actions[i].secondUserName
          })
          break;
        case("player_click") :
          yield put({ 
            type: 'PLAYER_GUESS',
            playerId: actions[i].playerId,
            iconId: actions[i].iconId,
            cardId: actions[i].cardId,
          })
          break;
        default:
          break;
      }
    }
    yield put({
      type: 'UPDATE_LAST_ACTION_INDEX',
      lastActionIndex: payload.data.actions.length -1
    })
}

// if(action.type == 'second_user_joined') 
