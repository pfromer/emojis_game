import { put, takeEvery, race, call, take, select } from 'redux-saga/effects'
import { Game, Card, Icon } from '../types/game';

const delay = (ms) => new Promise(res => setTimeout(res, ms))

// ...

// Our worker Saga: will perform the async increment task
export function* computerPlay() {
    yield put({
        type: 'ADD_PLAYER',
        id: 2,
        name: "computer",
        isCurrentPlayer: false
    });
    yield put({ type: 'START_PLAYING' });


    let computerCard = yield select(computerCardSelector);
    while (computerCard != null) {
        yield call(delay, 400);
        let currentCard = yield select(currentCardSelector);
        let commonIcon = yield call(iconInCommon, currentCard, computerCard);
        yield put({
            type: 'PLAYER_GUESS',
            iconId: commonIcon.id,
            playerId: 2
        })
        computerCard = yield select(computerCardSelector);
    }
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchStartPlaying() {
    yield take('START_PLAYING_ASYNC')
    yield race([
        call(computerPlay),
        take('STOP_PLAYING')
    ]);
}

const currentCardSelector = (state): Card => (state.gameReducer.currentCard)

const computerCardSelector = (state): Card => (state.gameReducer.players.filter(p => !p.isCurrentPlayer)[0].cards[0])

const iconInCommon = (card1: Card, card2: Card): Icon => {
    return card1.icons.find(i => card2.icons.find(i2 => i2 == i));
}