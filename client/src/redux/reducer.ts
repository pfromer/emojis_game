import { combineReducers } from 'redux';
import taskReducer from '../ducks/task';
import gameReducer from '../ducks/gameReducer';

const rootReducer = combineReducers({
  taskReducer,
  gameReducer
});

export default rootReducer;
