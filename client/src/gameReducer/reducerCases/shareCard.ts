import { Game } from '../../types/game';

const shareCard = (state: Game, action : any): Game => {
    return { ...state,
            started: true, 
            allCards: state
                .allCards.map(c => c.id == action.cardId ? { ...c, shareCard: true, initialPosition: false } : c) };
};

export default shareCard