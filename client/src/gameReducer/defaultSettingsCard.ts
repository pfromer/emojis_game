import { PositionedCard } from '../types/game';

const defaultSettingsCard = (card: PositionedCard): PositionedCard => {
    return { ...card, shareCard: false, initialPosition: false }
}

export default defaultSettingsCard