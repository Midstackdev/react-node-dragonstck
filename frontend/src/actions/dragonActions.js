import axios from "axios"
import { DRAGON } from "../constants/dragonConstants"

export const fetchDragon = () => async(dispatch) => {
    dispatch({ type: DRAGON.FETCH })
    try {
        const {data} = await axios.get(`dragon/new`)
        dispatch({
            type: DRAGON.FETCH_SUCCESS,
            dragon: data.dragon
        })
    } catch (error) {
        dispatch({ 
            type: DRAGON.FETCH_ERROR,
            message: error.response && error.response.data.message ? error.response.data.message : error.response
        })
        console.error(error.response)
    }
}