import { combineReducers } from 'redux';
import socketReducer from '../socketConnection/reducer'
import gameReducer from '../gameReducer/index';

const rootReducer = combineReducers({
  socketReducer,
  gameReducer
});

export default rootReducer;
