import { Game, Player, PositionedCard } from '../types/game';
import { allCards } from '../modules/allCards';

const PLAYER_GUESS = 'PLAYER_GUESS';
const SHARE_CARD = 'SHARE_CARD';
const ADD_PLAYER = 'ADD_PLAYER';
const START_PLAYING = 'START_PLAYING'
const RESET = 'RESET'
const SET_IS_FIRST_USER = 'SET_IS_FIRST_USER'
const BUILD_DECK = 'BUILD_DECK'
const ROTATE_CARD = 'ROTATE_CARD';

const shareCards = (state: Game): { players: Player[] } => {
    let cardsByPlayer: number = Math.floor((state.deck.length - 1) / (state.players.length));

    const getNextCards = (indexStart: number, isCurrentPlayer: boolean): PositionedCard[] => {
        return state.deck.slice(1, state.deck.length).slice(indexStart * cardsByPlayer, (indexStart + 1) * cardsByPlayer).map(function (card, index) {
            return {
                ...card,
                zIndex: cardsByPlayer - index,
                belongsToCurrentPlayer: isCurrentPlayer,
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

const buildDeckFromServer = (randomOrder : Int16Array): PositionedCard[] => {
  let result = [];

  for (let i = 0; i < randomOrder.length; i++) {
      let card = allCards[randomOrder[i]];
      result.push({ ...card, zIndex: 1, top: 0, left: 0, isCentered: false, shareCard: false, initialPosition: true });
  }
  return result;
}

const defaultSettingsCard = (card: PositionedCard): PositionedCard => {
    return { ...card, shareCard: false, initialPosition: false }
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
        isFirstUser: true
    }
}

const initialGameState: Game = initalGame()

export default (state: Game = initialGameState, action: any): Game => {
    switch (action.type) {
      case BUILD_DECK:
        return {
            ...state,
            deck : buildDeckFromServer(action.randomOrder)
        };
        case START_PLAYING:
            let cardsWithPlayers = shareCards(state);
            let firstCardOnTable = defaultSettingsCard({ ...state.deck[0], belongsToCurrentPlayer: null, left: 50, isCentered: true, index: 0 });
            return {
                ...state,
                currentCard: firstCardOnTable,
                started: true,
                players: cardsWithPlayers.players,
                allCards: [...[firstCardOnTable], ...cardsWithPlayers.players[0].cards, ...cardsWithPlayers.players[1].cards].sort(function (x, y) { return x.id < y.id ? -1 : 1 })
            };

        case PLAYER_GUESS:
            let player = state.players.find(p => p.id == action.playerId);
            let playerCard = player.cards[0];
            let leftCardsForPlayer = player.cards.slice(1, player.cards.length);
            if (state.currentCard.icons.map(i => i.id).includes(action.iconId)) {
                let updatedPlayer: Player = { ...player, cards: leftCardsForPlayer };
                let updatedPlayers = [updatedPlayer, ...state.players.filter(p => p.id != action.playerId)].sort(p => p.id);
                let winner = state.winner == null && leftCardsForPlayer.length == 0 ? player : null;
                let gameLost = !state.gameWon && updatedPlayers.find(p => !p.isCurrentPlayer).cards.length == 0;
                let gameWon = !state.gameLost && updatedPlayers.find(p => p.isCurrentPlayer).cards.length == 0;
                let currentCard = defaultSettingsCard({ ...playerCard, zIndex: state.zIndex + 1, isCentered: true })
                let allCards = [
                    ...state.allCards.filter(c => c.id != currentCard.id).map(c => defaultSettingsCard(c)),
                    ...[currentCard]
                ];
                return { ...state, currentCard: currentCard, players: updatedPlayers, winner: winner, gameLost: gameLost, gameWon: gameWon, zIndex: state.zIndex + 1, allCards: allCards };
            } else {
                return state;
            }
          case ROTATE_CARD:
            let _player = state.players.find(p => p.id == action.playerId);
            let _playerCard = _player.cards[0];
            let _rotatedCard = defaultSettingsCard({..._playerCard, rotated : true})
            let allCards = [
              ...state.allCards.filter(c => c.id != _playerCard.id).map(c => defaultSettingsCard(c)),
              ...[_rotatedCard]
            ];
            return { ...state, allCards: allCards };
        case SHARE_CARD:
            let _allCards2 = state.allCards.map(c => c.id == action.cardId ? { ...c, shareCard: true, initialPosition: false } : c);
            return { ...state, allCards: _allCards2 };
        case ADD_PLAYER:
            let updatedPlayers = [...state.players, { id: action.id, name: action.name, cards: [], currentCard: null, isCurrentPlayer: action.isCurrentPlayer }]
            return {
                ...state,
                players: updatedPlayers
            }
        case RESET:
            return initalGame();
        case SET_IS_FIRST_USER:
            return {...state, isFirstUser : action.isFirstUser}

        default:
            return state;
    }
};