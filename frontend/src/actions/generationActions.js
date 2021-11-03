import { GENERATION_ACTION_TYPE } from "../constants/generationConstants"

export const generationActionCreator = (payload) => {
    return {
        type: GENERATION_ACTION_TYPE,
        generation: payload
    }
}