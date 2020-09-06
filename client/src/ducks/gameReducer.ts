import { Game, Card, Icon, Player } from '../types/game';
import { allCards } from '../modules/allCards';

const ADD_PLAYER = 'ADD_PLAYER';
const START_PLAYING = 'START_PLAYING';
const PLAYER_GUESS = 'PLAYER_GUESS';

const builDeck = (): Card[] => {
    let result = [];
    let allCardsCopy = allCards.slice();

    for (let i = 0; i < allCards.length; i++) {
        let n = Math.floor((Math.random() * allCardsCopy.length));
        let card = allCardsCopy[n];
        allCardsCopy.splice(n, 1);
        result.push(card);
    }

    return result;
}

const initialGameState: Game = {
    players: [],
    deck: builDeck(),
    currentCard: null,
    winner: null,
    gameOver: false,
    started: false
};


export default (state: Game = initialGameState, action: any): Game => {
    switch (action.type) {
        case ADD_PLAYER:
            return { ...state, players: [...state.players, { id: action.id, name: action.name, cards: [], currentCard: null, isCurrentPlayer: action.isCurrentPlayer }] };
        case START_PLAYING:
            let cardsWithPlayers = shareCards(state);

            return {
                ...state, currentCard: state.deck[0], players: cardsWithPlayers.players, started: true
            };

        case PLAYER_GUESS:
            if (state.currentCard.icons.map(i => i.id).includes(action.iconId)) {
                let player = state.players.find(p => p.id == action.playerId)
                let playerCard = player.cards[0];
                let leftCardsForPlayer = player.cards.slice(1, player.cards.length);
                let updatedPlayer: Player = { ...player, cards: leftCardsForPlayer };
                let updatedPlayers = [updatedPlayer, ...state.players.filter(p => p.id != action.playerId)].sort(p => p.id)
                let winner = state.winner == null && leftCardsForPlayer.length == 0 ? player : null
                let gameOver = updatedPlayers.every(p => p.cards.length == 0)
                return { ...state, currentCard: playerCard, players: updatedPlayers, winner: winner, gameOver: gameOver }
            }
            return state;

        default:
            return state;
    }
};


const shareCards = (state: Game): { players: Player[] } => {

    let cardsByPlayer: number = Math.floor((state.deck.length - 1) / (state.players.length));

    const getNextCards = (indexStart: number): Card[] => {
        return state.deck.slice(1, state.deck.length).slice(indexStart * cardsByPlayer, (indexStart + 1) * cardsByPlayer);
    }

    let newPlayers = [...state.players].map((player, index) => {
        return { ...player, cards: getNextCards(index) }
    });

    return { players: newPlayers };
};