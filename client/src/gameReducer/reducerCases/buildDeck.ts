import { Game } from '../../types/game';
import { allCards } from '../../modules/allCards';
import { PositionedCard } from '../../types/game';

const builDeck = (state: Game, action : any): Game => {
    return {
        ...state,
        deck : buildDeckFromServer(action.randomOrder)
    };
};

const buildDeckFromServer = (randomOrder : Int16Array): PositionedCard[] => {
    let result = [];
    for (let i = 0; i < randomOrder.length; i++) {
        let card = allCards[randomOrder[i]];
        result.push({ ...card, zIndex: 1, top: 0, left: 0, isCentered: false, shareCard: false, initialPosition: true });
    }
    return result;
}
export default builDeck



