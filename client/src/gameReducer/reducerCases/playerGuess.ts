import { Game, Player } from '../../types/game';
import defaultSettingsCard from '../defaultSettingsCard';

const playerGuess = (state: Game, action : any): Game => {
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
                return { ...state, 
                        currentCard: currentCard, 
                        players: updatedPlayers, 
                        winner: winner, 
                        gameLost: gameLost, 
                        gameWon: gameWon, 
                        zIndex: state.zIndex + 1, 
                        allCards: allCards 
                    };
            } else {
                return state;
            }
};

export default playerGuess



