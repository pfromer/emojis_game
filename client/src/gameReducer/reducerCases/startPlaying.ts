import { Game, Player, PositionedCard } from '../../types/game';
import defaultSettingsCard from '../defaultSettingsCard';

const assignCardsToPlayers = (state: Game): { players: Player[] } => {
    let cardsByPlayer: number = Math.floor((state.deck.length - 1) / (state.players.length));

    const getNextCards = (indexStart: number, isCurrentPlayer: boolean): PositionedCard[] => {
        return state.deck
            .slice(1, state.deck.length)
            .slice(indexStart * cardsByPlayer, (indexStart + 1) * cardsByPlayer)
            .map(function (card, index) {
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

const startPlaying = (state: Game, action : any): Game => {
    let cardsWithPlayers = assignCardsToPlayers(state);
    console.log("cardsWithPlayers", cardsWithPlayers)
    let firstCardOnTable = defaultSettingsCard({ ...state.deck[0], belongsToCurrentPlayer: null, left: 50, isCentered: true, index: 0 });
    console.log("firstCardOnTable", firstCardOnTable)
    console.log("reducer start playing")
    return {
        ...state,
        currentCard: firstCardOnTable,
        started: true,
        players: cardsWithPlayers.players,
        allCards: [...[firstCardOnTable], ...cardsWithPlayers.players[0].cards, ...cardsWithPlayers.players[1].cards].sort(function (x, y) { return x.id < y.id ? -1 : 1 })
    };
};

export default startPlaying



