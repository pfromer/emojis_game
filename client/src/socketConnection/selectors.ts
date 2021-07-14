import { Card } from "../types/game"

export const roomSelector = (state): string => (state.socketReducer.room)
export const firstPlayerNameSelector = (state): string => (state.gameReducer.players[0].name)
export const secondPlayerNameSelector = (state): string => (state.gameReducer.players[1].name)
export const isFirstUserSelector = (state): string => (state.gameReducer.isFirstUser)
export const allCardsSelector = (state): [Card] => state.gameReducer.allCards.sort(function (x, y) { return x.index < y.index ? -1 : 1 })
export const lastActionsIndexSelector = (state): Number => state.gameReducer.lastActionIndex