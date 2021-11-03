import generation from './generationReducer';
import dragon from './dragonReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    generation,
    dragon
});