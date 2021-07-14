import { Game } from '../../types/game';
import defaultSettingsCard from '../defaultSettingsCard';

const rotateCard = (state: Game, action : any): Game => {
    let _player = state.players.find(p => p.id == action.playerId);
            let _playerCard = _player.cards[0];
            let _rotatedCard = defaultSettingsCard({..._playerCard, rotated : true})
            let allCards = [
              ...state.allCards.filter(c => c.id != _playerCard.id).map(c => defaultSettingsCard(c)),
              ...[_rotatedCard]
            ];
            return { ...state, allCards: allCards }; 
};

export default rotateCard