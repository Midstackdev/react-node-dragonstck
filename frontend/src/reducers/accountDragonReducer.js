 import { ACCOUNT_DRAGON } from "../constants/accountDragonConstants";
import fetchStates from './fetchStates'

const DEFAULT_DRAGONS = { dragons: [] };

const accountDragonReducer = (state = DEFAULT_DRAGONS, action) => {

    switch (action.type) {
        case ACCOUNT_DRAGON.FETCH:
            return { ...state, status: fetchStates.fetching };
        case ACCOUNT_DRAGON.FETCH_ERROR:
            return { ...state, status: fetchStates.error, message: action.message };
        case ACCOUNT_DRAGON.FETCH_SUCCESS:
            return { 
                ...state, 
                status: fetchStates.success, 
                message: action.message,
                dragons: action.dragons
             };
    
        default:
            return state;
            
    }
}

export default accountDragonReducer;