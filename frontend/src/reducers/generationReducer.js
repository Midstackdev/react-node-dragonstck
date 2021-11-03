import { GENERATION_ACTION_TYPE } from "../constants/generationConstants";


const DEFAULT_GENERATION = { expiration: '', generationId: '' };

export const generationReducer = (state, action) => {

    if(action.type === GENERATION_ACTION_TYPE) {
        return { generation: action.generation }
    }
    return {
        generation: DEFAULT_GENERATION
    }
}