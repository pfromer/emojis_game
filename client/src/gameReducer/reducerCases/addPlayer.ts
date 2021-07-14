import { Game } from '../../types/game';

const addPlayer = (state: Game, action : any): Game => {
    let updatedPlayers = 
            [...state.players, 
            {   id: action.id, 
                name: action.name, 
                cards: [], 
                currentCard: null, 
                isCurrentPlayer: action.isCurrentPlayer 
            }]
    return {
        ...state,
        players: updatedPlayers
    }
};

export default addPlayer