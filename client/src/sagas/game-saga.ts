import { put, takeEvery, race, call, take, select, takeLatest } from 'redux-saga/effects'
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
        yield call(delay, 8000);
        let currentCard = yield select(currentCardSelector);
        let commonIcon = yield call(iconInCommon, currentCard, computerCard);
        yield put({
            type: 'PLAYER_GUESS',
            iconId: commonIcon.id,
            playerId: 2
        })
        computerCard = yield select(computerCardSelector);

        yield put({
            type: 'MOVE_CURRENT_CARD_TO_CENTER'
        });
    }
}

export function* play(action) {
    yield put({
        type: 'PLAYER_GUESS',
        iconId: action.iconId,
        playerId: action.playerId,
        isCurrentPlayer: action.isCurrentPlayer
    });

    let currentCard = yield select(currentCardSelector);
    if (currentCard.id == action.cardId) {
        yield put({
            type: 'MOVE_CURRENT_CARD_TO_CENTER'
        });
    }
}


// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchStartPlaying() {
    yield takeLatest('START_PLAYING_ASYNC', computerPlay)
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchPlayerGuess() {
    yield takeLatest('PLAYER_GUESS_ASYNC_2', play)

}

const currentCardSelector = (state): Card => (state.gameReducer.currentCard)

const computerCardSelector = (state): Card => (state.gameReducer.players.filter(p => !p.isCurrentPlayer)[0].cards[0])

const iconInCommon = (card1: Card, card2: Card): Icon => {
    return card1.icons.find(i => card2.icons.find(i2 => i2 == i));
}