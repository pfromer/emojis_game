export type Icon = {
    name: string
    image: string
    id: number
}

export type Card = {
    id: number
    icons: Icon[]
}


export type Player = {
    id: number
    name: string
    cards: Card[]
    currentCard: Card | null
    isCurrentPlayer: Boolean
}

export type Game = {
    players: Player[]
    deck: Card[]
    currentCard: Card | null
    winner: Player | null
    gameOver: boolean,
    started: boolean
}

/*
export class Player {
    id: number;
    name: string;
    cards: Card[];
    currentCard: Card | null

    constructor(_name: string, _id: number) {
        this.name = _name;
        this.id = _id;
        this.cards = new Array();
    }








}*/
