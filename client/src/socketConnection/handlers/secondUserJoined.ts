import { delay, put, select, take, takeEvery, takeLatest } from "redux-saga/effects";
import { allCardsSelector, isFirstUserSelector, playersLengthSelector } from "../selectors";

export default function* secondUserJoinedHandler() {
   yield takeEvery('SECOND_USER_JOINED', handler);    
}
function* handler(action) {
    const playersLength = yield select(playersLengthSelector)
    const isFirstUser = yield select(isFirstUserSelector)
    if((playersLength == 1 && isFirstUser) ||  (playersLength == 2 && !isFirstUser)) {
      const randomOrder = yield action.randomOrder
      const secondUserName = yield action.secondUserName
      yield put({ type: "BUILD_DECK", randomOrder : randomOrder });
        console.log("random order", randomOrder)
        console.log("isFirstUser", isFirstUser)
        if(isFirstUser) {
          yield put({ 
            type: 'ADD_PLAYER',
            id: 2,
            name: secondUserName,
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
  }