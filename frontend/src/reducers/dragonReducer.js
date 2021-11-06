 import { DRAGON, PUBLIC_DRAGON } from "../constants/dragonConstants";
import fetchStates from './fetchStates'

const DEFAULT_DRAGON = { 
    expiration: '', 
    traits: [], 
    generationId: '', 
    dragonId: '',
    nickname: '',
    birthdate: '',
     
};

const DEFAULT_DRAGONS = { dragons: [] };

const dragonReducer = (state = DEFAULT_DRAGON, action) => {

    switch (action.type) {
        case DRAGON.FETCH:
            return { ...state, status: fetchStates.fetching };
        case DRAGON.FETCH_ERROR:
            return { ...state, status: fetchStates.error, message: action.message };
        case DRAGON.FETCH_SUCCESS:
            return { ...state, status: fetchStates.success, ...action.dragon };
    
        default:
            return state;
            
    }
}

const publicDragonsReducer = (state = DEFAULT_DRAGONS, action) => {

    switch (action.type) {
        case PUBLIC_DRAGON.FETCH:
            return { ...state, status: fetchStates.fetching };
        case PUBLIC_DRAGON.FETCH_ERROR:
            return { ...state, status: fetchStates.error, message: action.message };
        case PUBLIC_DRAGON.FETCH_SUCCESS:
            return { ...state, status: fetchStates.success, dragons: action.dragons };
    
        default:
            return state;
            
    }
}

export {
    dragonReducer,
    publicDragonsReducer
};