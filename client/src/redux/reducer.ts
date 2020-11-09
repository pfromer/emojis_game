import { combineReducers } from 'redux';
import socketReducer from '../ducks/socketReducer';
import gameReducer from '../ducks/gameReducer';

const rootReducer = combineReducers({
  socketReducer,
  gameReducer
});

export default rootReducer;
