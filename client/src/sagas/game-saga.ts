import { put, call, select, takeLatest } from 'redux-saga/effects'
import { Card, Icon } from '../types/game';

const delay = (ms) => new Promise(res => setTimeout(res, ms))


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function* computerPlay() {

    yield put({ type: 'START_PLAYING' });
    let allCards = yield select(allCardsSelector);

    for (let i = 0; i < allCards.length; i++) {
        yield put({ type: 'SHARE_CARD', cardId: allCards[i].id });
        yield call(delay, 10);
    }

    //yield put({ type: 'START_CHANNEL' });

    let computerCard = yield select(computerCardSelector);
    while (computerCard != null) {
        yield call(delay, getRandomInt(2000, 8000));
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

export function* play(action) {
    yield put({
        type: 'PLAYER_GUESS',
        iconId: action.iconId,
        playerId: action.playerId,
        isCurrentPlayer: action.isCurrentPlayer
    });
}

export function* watchStartPlaying() {
    yield takeLatest('START_PLAYING_ALONE_SAGA', computerPlay)
}

export function* watchPlayerGuess() {
    yield takeLatest('PLAYER_GUESS_ASYNC_2', play)
}

const currentCardSelector = (state): Card => (state.gameReducer.currentCard)

const computerCardSelector = (state): Card => (state.gameReducer.players.filter(p => !p.isCurrentPlayer)[0].cards[0])

const allCardsSelector = (state): [Card] => state.gameReducer.allCards.sort(function (x, y) { return x.index < y.index ? -1 : 1 })

const iconInCommon = (card1: Card, card2: Card): Icon => {
    return card1.icons.find(i => card2.icons.find(i2 => i2 == i));
}