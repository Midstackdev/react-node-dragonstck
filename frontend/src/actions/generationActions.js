import axios from "axios"
import { GENERATION } from "../constants/generationConstants"

export const fetchGeneration = () => async(dispatch) => {
    dispatch({ type: GENERATION.FETCH })
    try {
        const {data} = await axios.get(`generation`)
        dispatch({
            type: GENERATION.FETCH_SUCCESS,
            generation: data.generation
        })
    } catch (error) {
        dispatch({ 
            type: GENERATION.FETCH_ERROR,
            message: error.response && error.response.data.message ? error.response.data.message : error.response
        })
        console.error(error.response)
    }
}