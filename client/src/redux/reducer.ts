import { combineReducers } from 'redux';
import taskReducer from '../modules/task';
import gameReducer from '../modules/gameReducer';

const rootReducer = combineReducers({
  taskReducer,
  gameReducer
});

export default rootReducer;
