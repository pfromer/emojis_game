import { Game, Card, Icon, Player, PositionedCard } from '../types/game';
import { allCards } from '../modules/allCards';

const ADD_PLAYER = 'ADD_PLAYER';
const START_PLAYING = 'START_PLAYING';
const PLAYER_GUESS = 'PLAYER_GUESS';
const MOVE_TO_END = 'MOVE_TO_END';
const POSITION_OTHER_CARDS = 'POSITION_OTHER_CARDS';
const MOVE_TO_PLAYER_CARDS = 'MOVE_TO_PLAYER_CARDS';


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

const builDeck = (): PositionedCard[] => {
    let result = [];
    let allCardsCopy = allCards.slice();

    for (let i = 0; i < allCards.length; i++) {
        let n = Math.floor((Math.random() * allCardsCopy.length));
        let card = allCardsCopy[n];
        allCardsCopy.splice(n, 1);
        result.push({ ...card, zIndex: 1, top: 0, left: 0, isCentered: false, moveToEnd: false, moveToToPlayerCards: false, initialPosition: true });
    }
    return result;
}

const initalGame = (): Game => {

    let state = {
        players: [{
            id: 1,
            name: 'yo',
            isCurrentPlayer: true,
            cards: [],
            currentCard: null
        }, {
            id: 2,
            name: 'computer',
            isCurrentPlayer: false,
            cards: [],
            currentCard: null

        }
        ],
        deck: builDeck(),
        currentCard: null,
        winner: null,
        gameOver: false,
        started: false,
        zIndex: 56,
        allCards: []
    }

    let cardsWithPlayers = shareCards(state);
    let firstCardOnTable = { ...state.deck[0], top: 35, left: 50, isCentered: true, index: 0, moveToEnd: false, moveToToPlayerCards: false, initialPosition: false };
    return {
        ...state, currentCard: firstCardOnTable, started: true,
        players: cardsWithPlayers.players, allCards: [...[firstCardOnTable], ...cardsWithPlayers.players[0].cards, ...cardsWithPlayers.players[1].cards].sort(function (x, y) { return x.id < y.id ? -1 : 1 })
    };
}

const initialGameState: Game = initalGame()

export default (state: Game = initialGameState, action: any): Game => {
    switch (action.type) {


        case PLAYER_GUESS:
            let player = state.players.find(p => p.id == action.playerId);
            let playerCard = player.cards[0];
            let leftCardsForPlayer = player.cards.slice(1, player.cards.length);
            if (state.currentCard.icons.map(i => i.id).includes(action.iconId)) {



                let updatedPlayer: Player = { ...player, cards: leftCardsForPlayer };
                let updatedPlayers = [updatedPlayer, ...state.players.filter(p => p.id != action.playerId)].sort(p => p.id);
                let winner = state.winner == null && leftCardsForPlayer.length == 0 ? player : null;
                let gameOver = updatedPlayers.every(p => p.cards.length == 0);
                let currentCard = { ...playerCard, zIndex: state.zIndex + 1, isCentered: true, moveToEnd: false, moveToToPlayerCards: false, initialPosition: false }


                let allCards = [...state.allCards.filter(c => c.id < currentCard.id).map(c => updatedPlayer.cards.some(c2 => c2.id == c.id) ? { ...c, index: c.index - 1, moveToEnd: false, moveToToPlayerCards: false, initialPosition: false } : { ...c, initialPosition: false, moveToToPlayerCards: false }), ...[currentCard],
                ...state.allCards.filter(c => c.id > currentCard.id).map(c => updatedPlayer.cards.some(c2 => c2.id == c.id) ? { ...c, index: c.index - 1, moveToEnd: false, moveToToPlayerCards: false, initialPosition: false } : { ...c, initialPosition: false, moveToToPlayerCards: false })];




                return { ...state, currentCard: currentCard, players: updatedPlayers, winner: winner, gameOver: gameOver, zIndex: state.zIndex + 1, allCards: allCards };
            } else {

                return state;
            }

        case MOVE_TO_END:
            //cardId
            let allCards = state.allCards.map(c => c.id == action.cardId ? { ...c, moveToEnd: true, moveToToPlayerCards: false, initialPosition: false, index: state.players.find(p => p.id == action.playerId).cards.length } : { ...c, moveToEnd: false, moveToToPlayerCards: false, initialPosition: false });
            return { ...state, allCards: allCards };

        case POSITION_OTHER_CARDS:
            //playerid
            let _player = state.players.find(p => p.id == action.playerId);
            let updatedPlayerCards = _player.cards.slice(1, _player.cards.length).concat([_player.cards[0]]).map(function (card, index) { return { ...card, index: index, zIndex: 56 - index }; });
            let updatedPlayer: Player = { ..._player, cards: updatedPlayerCards };
            let updatedPlayers = [updatedPlayer, ...state.players.filter(p => p.id != action.playerId)].sort(p => p.id);
            let _allCards = state.allCards.map(function (c) {
                let c2 = updatedPlayerCards.find(c3 => c3.id == c.id);
                let result = c2 ? c2 : c;
                return { ...result, moveToEnd: false, initialPosition: false };
            });

            return { ...state, players: updatedPlayers, allCards: _allCards };

        case MOVE_TO_PLAYER_CARDS:
            let _allCards2 = state.allCards.map(c => c.id == action.cardId ? { ...c, moveToToPlayerCards: true, initialPosition: false } : c);
            return { ...state, allCards: _allCards2 };
        default:
            return state;
    }
};