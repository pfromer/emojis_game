export type Icon = {
    name: string
    image: string
    id: number,
    rotated: boolean
}

export type Card = {
    id: number
    icons: Icon[],
}

export interface PositionedCard extends Card {
    belongsToCurrentPlayer: boolean | null,
    left: number,
    zIndex: number,
    isCentered: boolean,
    index: number,
    shareCard: boolean,
    initialPosition: boolean,
    rotated: boolean 
}

export type Player = {
    id: number
    name: string
    cards: PositionedCard[]
    currentCard: Card | null
    isCurrentPlayer: boolean
}

export type Game = {
    players: Player[]
    deck: PositionedCard[]
    currentCard: PositionedCard | null
    winner: Player | null
    gameLost: boolean,
    gameWon: boolean,
    started: boolean,
    zIndex: number,
    allCards: PositionedCard[],
    playersCount: number | null,
    isFirstUser: boolean,
    lastActionIndex: Number
}