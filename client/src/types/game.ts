export type Icon = {
    name: string
    image: string
    id: number
}

export type Card = {
    id: number
    icons: Icon[],
}

export interface PositionedCard extends Card {
    top: number,
    left: number,
    zIndex: number,
    isCentered: boolean,
    index: number,
    shareCard: boolean,
    initialPosition: boolean
}

export type Player = {
    id: number
    name: string
    cards: PositionedCard[]
    currentCard: Card | null
    isCurrentPlayer: Boolean
}

export type Game = {
    players: Player[]
    deck: PositionedCard[]
    currentCard: PositionedCard | null
    winner: Player | null
    gameOver: boolean,
    started: boolean,
    zIndex: number,
    allCards: PositionedCard[]
}