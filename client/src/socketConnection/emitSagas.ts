import { take, put, select, takeLatest, call } from "redux-saga/effects";
import { CREATE_NEW_ROOM, SET_ROOM, JOIN_ROOM, SECOND_USER_COMPLETED_FORM } from "./reducer";
import { firstPlayerNameSelector, roomSelector, secondPlayerNameSelector } from "./selectors";
import { connect } from "./connectSagas";

export const createNewRoomSaga = function* () {
    while (true) {
      yield take(CREATE_NEW_ROOM);
      const socket = yield call(connect);
      const room = yield Math.random().toString().replace('.','')
      yield put({ type: SET_ROOM, room : room });
      console.log("creating new room ", room)
      const selfName = yield select(firstPlayerNameSelector)
      socket.emit('join_room', {room: room, user_name : selfName});
      history.pushState({},'','/#/first_user/' + room + '/' + selfName)
      history.go()
    }
  };
  
  // saga listens for start and stop actions
  export const joinRoomSaga = function* () {
    while (true) {
      yield take(JOIN_ROOM);
      const socket = yield call(connect);
      const room = yield select(roomSelector)
      console.log("joining room ", room)
      socket.emit('join_room', {room: room, user_name : "unknown"});
    }
  };
  
  // saga listens for start and stop actions
  export const secondUserCompletedFormSaga = function* () {
    while (true) {
      yield take(SECOND_USER_COMPLETED_FORM);
      const socket = yield call(connect);
      const selfName = yield select(secondPlayerNameSelector)
      const room = yield select(roomSelector)
      socket.emit('second_user_joined', { secondUserName : selfName, room : room});
    }
  };
  
  export const listenIconClickSaga = function* () {
    yield takeLatest('PLAYER_ICON_CLICK', sendUserClick)
  };
  
  export function* sendUserClick(action) {
    const room = yield select(roomSelector)
    const args = {
      iconId: action.iconId,
      playerId: action.playerId,
      cardId: action.cardId,
      room : room
    }
    const socket = yield call(connect);
    socket.emit('player_click', args);
  }