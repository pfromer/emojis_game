import { delay, put, select } from "redux-saga/effects";
import { allCardsSelector, isFirstUserSelector } from "../selectors";

export default function* secondUserJoinedHandler(payload) {
    yield put({ type: "BUILD_DECK", randomOrder : payload.data.randomOrder });
    console.log("random order", payload.data.randomOrder)
    const isFirstUser = yield select(isFirstUserSelector)
    console.log("isFirstUser", isFirstUser)
    if(isFirstUser) {
      yield put({ 
        type: 'ADD_PLAYER',
        id: 2,
        name: payload.data.secondUserName,
        isCurrentPlayer: false
      })
    }
    yield put({ type: "START_PLAYING" });
    let allCards = yield select(allCardsSelector);
    console.log("allCards", allCards)

    for (let i = 0; i < allCards.length; i++) {
        console.log("card i", i)
        yield put({ type: 'SHARE_CARD', cardId: allCards[i].id });
        yield delay(10)
    }
}