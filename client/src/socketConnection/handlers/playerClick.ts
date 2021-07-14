import { put } from "redux-saga/effects";

export default function* playerClickedHandler(payload) {
    yield put({ 
        type: 'PLAYER_GUESS',
        playerId: payload.data.playerId,
        iconId: payload.data.iconId,
        cardId: payload.data.cardId,
      })
}