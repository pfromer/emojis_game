import { CurrentCard } from '../../components/Table/Styles';
import { Game, Player } from '../../types/game';
import defaultSettingsCard from '../defaultSettingsCard';

const playerGuess = (state: Game, action : any): Game => {
    let player = state.players.find(p => p.id == action.playerId);
    let playerCard = player.cards[0];
    let leftCardsForPlayer = player.cards.slice(1, player.cards.length);
    let stateCurrentCard = {...state.currentCard}

    if (stateCurrentCard.icons.map(i => i.id).includes(action.iconId)) {
        let updatedPlayer: Player = { ...player, cards: leftCardsForPlayer };
        let updatedPlayers = [updatedPlayer, ...state.players.filter(p => p.id != action.playerId)].sort(p => p.id);
        let winner = state.winner == null && leftCardsForPlayer.length == 0 ? player : null;
        let gameLost = !state.gameWon && updatedPlayers.find(p => !p.isCurrentPlayer).cards.length == 0;
        let gameWon = !state.gameLost && updatedPlayers.find(p => p.isCurrentPlayer).cards.length == 0;
        let currentCard = defaultSettingsCard({ ...playerCard, zIndex: state.zIndex + 1, isCentered: true })
        let allCards
        if(!player.isCurrentPlayer) {
            debugger
            let currentPlayer = state.players.find(p => p.isCurrentPlayer);
            let currentPlayerCard = currentPlayer.cards[0]
            let iconInCommon = currentPlayerCard.icons.find(icon => state.currentCard.icons.map(_icon => _icon.id).includes(icon.id))
            currentPlayerCard = {
                ...currentPlayerCard, 
                icons: currentPlayerCard.icons.map(function(icon) {
                    return icon.id == iconInCommon.id ? { ...icon, rotated: true } : icon 
            })}
            stateCurrentCard = {
                ...stateCurrentCard, 
                icons: stateCurrentCard.icons.map(function(icon) {
                    return icon.id == iconInCommon.id ? { ...icon, rotated: true } : icon 
            })}
            allCards = [
                ...state.allCards.filter(c => c.id != currentCard.id && c.id != currentPlayerCard.id && c.id != stateCurrentCard.id).map(c => defaultSettingsCard(c)),
                
                ...[defaultSettingsCard(currentPlayerCard)],
                ...[defaultSettingsCard(stateCurrentCard)],
                ...[currentCard]
            ];
        } else {
            allCards = [
                ...state.allCards.filter(c => c.id != currentCard.id).map(c => defaultSettingsCard(c)),
                ...[currentCard]
            ];
        }
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



