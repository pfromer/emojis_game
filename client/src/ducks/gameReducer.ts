import { Game, Player, PositionedCard } from '../types/game';
import { allCards } from '../modules/allCards';

const PLAYER_GUESS = 'PLAYER_GUESS';
const SHARE_CARD = 'SHARE_CARD';

const shareCards = (state: Game): { players: Player[] } => {
    let cardsByPlayer: number = Math.floor((state.deck.length - 1) / (state.players.length));

    const gepTop: (isCurrentPlayer: Boolean) => number = function (isCurrentPlayer: boolean) {
        if (isCurrentPlayer) {
            return 68; //TODO modificar esto en vez de devolver top devolver el player al que pertenece la carta y que el styled component sepa posicionarla
        }
        return 0;
    }

    const getNextCards = (indexStart: number, isCurrentPlayer: Boolean): PositionedCard[] => {
        return state.deck.slice(1, state.deck.length).slice(indexStart * cardsByPlayer, (indexStart + 1) * cardsByPlayer).map(function (card, index) {
            return {
                ...card,
                zIndex: cardsByPlayer - index,
                top: gepTop(isCurrentPlayer),
                index: index
            }
        });
    }

    let playersWithCards = [...state.players].map((player, index) => {
        return { ...player, cards: getNextCards(index, player.isCurrentPlayer) }
    });

    return { players: playersWithCards };
};

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

const defaultSettingsCard = (card: PositionedCard): PositionedCard => {
    return { ...card, shareCard: false, initialPosition: false }
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
    let firstCardOnTable = defaultSettingsCard({ ...state.deck[0], top: 35, left: 50, isCentered: true, index: 0 });
    return {
        ...state,
        currentCard: firstCardOnTable,
        started: true,
        players: cardsWithPlayers.players,
        allCards: [...[firstCardOnTable], ...cardsWithPlayers.players[0].cards, ...cardsWithPlayers.players[1].cards].sort(function (x, y) { return x.id < y.id ? -1 : 1 })
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
                let currentCard = defaultSettingsCard({ ...playerCard, zIndex: state.zIndex + 1, isCentered: true })
                let allCards = [
                    ...state.allCards.filter(c => c.id != currentCard.id).map(c => defaultSettingsCard(c)),
                    ...[currentCard]
                ];
                return { ...state, currentCard: currentCard, players: updatedPlayers, winner: winner, gameOver: gameOver, zIndex: state.zIndex + 1, allCards: allCards };
            } else {
                return state;
            }
        case SHARE_CARD:
            let _allCards2 = state.allCards.map(c => c.id == action.cardId ? { ...c, shareCard: true, initialPosition: false } : c);
            return { ...state, allCards: _allCards2 };
        default:
            return state;
    }
};