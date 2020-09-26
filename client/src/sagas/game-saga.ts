import { put, call, select, takeLatest } from 'redux-saga/effects'
import { Card, Icon } from '../types/game';
import { allCards } from '../modules/allCards';

const delay = (ms) => new Promise(res => setTimeout(res, ms))

export function* computerPlay() {



    let allCards = yield select(allCardsSelector);

    for (let i = 0; i < allCards.length; i++) {
        yield put({ type: 'MOVE_TO_PLAYER_CARDS', cardId: allCards[i].id });
        yield call(delay, 10);

    }


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
    if (currentCard.id != action.cardId) {
        yield put({
            type: 'MOVE_TO_END',
            cardId: action.cardId,
            playerId: action.playerId
        })
        yield call(delay, 1000);
        yield put({
            type: 'POSITION_OTHER_CARDS',
            playerId: action.playerId
        })
    }
}

export function* watchStartPlaying() {
    yield takeLatest('START_PLAYING_ASYNC', computerPlay)
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