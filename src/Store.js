import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import monsterReducer from './reducers/MonsterReducer';

const reducer = combineReducers({
  monsterReducer,
});

const store = createStore(reducer, applyMiddleware(ReduxThunk));

export default store;
