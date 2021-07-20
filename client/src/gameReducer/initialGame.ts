import { Game, PositionedCard } from '../types/game';
import { allCards } from '../modules/allCards';

const builDeck = (): PositionedCard[] => {
    let result = [];
    let allCardsCopy = allCards.slice();

    for (let i = 0; i < allCards.length; i++) {
        let n = Math.floor((Math.random() * allCardsCopy.length));
        let card = allCardsCopy[n];
        allCardsCopy.splice(n, 1);
        result.push({ ...card, zIndex: 1, top: 0, left: 0, isCentered: false, shareCard: false, initialPosition: true });
    }
    return result;
}

const initalGame = (): Game => {
    return {
        players: [],
        deck: builDeck(),
        currentCard: null,
        started: false,
        winner: null,
        gameLost: false,
        gameWon: false,
        zIndex: 56,
        allCards: [],
        playersCount: null,
        isFirstUser: true,
        lastActionIndex: -1,
        blocked: false,
        remainingTime: 0
    }
}

export default initalGame