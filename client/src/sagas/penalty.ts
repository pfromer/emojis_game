import { put, call, takeLatest } from 'redux-saga/effects'

const delay = (ms) => new Promise(res => setTimeout(res, ms))

export function* whatcPenalty() {
    yield takeLatest('WRONG_ICON', setPenalty)
}

export function* setPenalty() {
    for (let i = 8; i > 0; i--) {
        yield put({ type: 'BLOCK_SCREEN', remainingTime: i });
        yield call(delay, 700);
    }
    yield put({ type: 'UNBLOCK_SCREEN' });
}