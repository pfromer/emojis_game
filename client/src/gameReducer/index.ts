import { Game } from '../types/game';
import defaultSettingsCard from './defaultSettingsCard';
import initalGame from './initialGame';
import addPlayer from './reducerCases/addPlayer';
import builDeck from './reducerCases/buildDeck';
import playerGuess from './reducerCases/playerGuess';
import rotateCard from './reducerCases/rotateCard';
import shareCard from './reducerCases/shareCard';
import startPlaying from './reducerCases/startPlaying';

const PLAYER_GUESS = 'PLAYER_GUESS';
const SHARE_CARD = 'SHARE_CARD';
const ADD_PLAYER = 'ADD_PLAYER';
const START_PLAYING = 'START_PLAYING'
const RESET = 'RESET'
const SET_IS_FIRST_USER = 'SET_IS_FIRST_USER'
const BUILD_DECK = 'BUILD_DECK'
const ROTATE_CARD = 'ROTATE_CARD';
const UPDATE_LAST_ACTION_INDEX = 'UPDATE_LAST_ACTION_INDEX';

export default (state: Game = initalGame(), action: any): Game => {
    switch (action.type) {
        case BUILD_DECK:
            return builDeck(state, action)
        case START_PLAYING:
            return startPlaying(state, action)
        case PLAYER_GUESS:
            return playerGuess(state, action)
        case ROTATE_CARD:
            return rotateCard(state, action)     
        case SHARE_CARD:
            return shareCard(state, action)
        case ADD_PLAYER:
            return addPlayer(state, action)
        case RESET:
            return initalGame();
        case SET_IS_FIRST_USER:
            return {...state, isFirstUser : action.isFirstUser}
        case UPDATE_LAST_ACTION_INDEX:
            return {...state, lastActionIndex : action.lastActionIndex}
        default:
            return state;
    }
};