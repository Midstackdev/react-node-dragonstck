import generation from './generationReducer';
import dragon from './dragonReducer';
import accountDragons from './accountDragonReducer';
import account from './accountReducer';
import accountInfo from './accountInfoReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    generation,
    dragon,
    account,
    accountDragons,
    accountInfo
});