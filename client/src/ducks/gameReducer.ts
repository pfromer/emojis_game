import { Game, Card, Icon, Player, PositionedCard } from '../types/game';
import { allCards } from '../modules/allCards';

const ADD_PLAYER = 'ADD_PLAYER';
const START_PLAYING = 'START_PLAYING';
const PLAYER_GUESS = 'PLAYER_GUESS';
const MOVE_CURRENT_CARD_TO_CENTER = 'MOVE_CURRENT_CARD_TO_CENTER';

const builDeck = (): PositionedCard[] => {
    let result = [];
    let allCardsCopy = allCards.slice();

    for (let i = 0; i < allCards.length; i++) {
        let n = Math.floor((Math.random() * allCardsCopy.length));
        let card = allCardsCopy[n];
        allCardsCopy.splice(n, 1);
        result.push({ ...card, zIndex: 1, top: 0, left: 0, isCentered: false });
    }
    return result;
}

const initialGameState: Game = {
    players: [],
    deck: builDeck(),
    currentCard: null,
    winner: null,
    gameOver: false,
    started: false,
    zIndex: 56,
    allCards: []
};

export default (state: Game = initialGameState, action: any): Game => {
    switch (action.type) {
        case ADD_PLAYER:
            return { ...state, players: [...state.players, { id: action.id, name: action.name, cards: [], currentCard: null, isCurrentPlayer: action.isCurrentPlayer }] };

        case START_PLAYING:
            let cardsWithPlayers = shareCards(state);
            let firstCardOnTable = { ...state.deck[0], top: 35, left: 50, isCentered: true, index: 0 };
            debugger
            return {
                ...state, currentCard: firstCardOnTable,
                players: cardsWithPlayers.players, started: true, allCards: [...[firstCardOnTable], ...cardsWithPlayers.players[0].cards, ...cardsWithPlayers.players[1].cards].sort(function (x, y) { return x.id < y.id ? -1 : 1 })
            };

        case PLAYER_GUESS:
            if (state.currentCard.icons.map(i => i.id).includes(action.iconId)) {
                let player = state.players.find(p => p.id == action.playerId);
                let playerCard = player.cards[0];
                let leftCardsForPlayer = player.cards.slice(1, player.cards.length);
                let updatedPlayer: Player = { ...player, cards: leftCardsForPlayer };
                let updatedPlayers = [updatedPlayer, ...state.players.filter(p => p.id != action.playerId)].sort(p => p.id);
                let winner = state.winner == null && leftCardsForPlayer.length == 0 ? player : null;
                let gameOver = updatedPlayers.every(p => p.cards.length == 0);
                return { ...state, currentCard: { ...playerCard, zIndex: state.zIndex + 1 }, players: updatedPlayers, winner: winner, gameOver: gameOver, zIndex: state.zIndex + 1 };
            }
            return state;

        case MOVE_CURRENT_CARD_TO_CENTER:
            let currentCard = state.currentCard;
            let allCards = [...state.allCards.filter(c => c.id < currentCard.id), ...[{ ...currentCard, isCentered: true, zIndex: state.zIndex + 1 }],
            ...state.allCards.filter(c => c.id > currentCard.id)];
            return { ...state, allCards: allCards }

        default:
            return state;
    }
};

const shareCards = (state: Game): { players: Player[] } => {
    let cardsByPlayer: number = Math.floor((state.deck.length - 1) / (state.players.length));

    const gepTop: (isCurrentPlayer: Boolean) => number = function (isCurrentPlayer: boolean) {

        if (isCurrentPlayer) {
            return 68
        }
        return 0;
    }

    const getNextCards = (indexStart: number, isCurrentPlayer: Boolean): PositionedCard[] => {
        return state.deck.slice(1, state.deck.length).slice(indexStart * cardsByPlayer, (indexStart + 1) * cardsByPlayer).map(function (card, index) {
            return {
                ...card,
                zIndex: cardsByPlayer - index,
                top: gepTop(isCurrentPlayer),
                left: 50,
                index: index
            }
        });
    }

    let newPlayers = [...state.players].map((player, index) => {
        return { ...player, cards: getNextCards(index, player.isCurrentPlayer) }
    });

    return { players: newPlayers };
};