import axios from "axios"
import { ACCOUNT_DRAGON } from "../constants/accountDragonConstants"

export const fetchAccountDragons = () => async(dispatch) => {
    dispatch({ type: ACCOUNT_DRAGON.FETCH })
    try {
        const {data} = await axios.get(`account/dragons`);
        // console.log(data)
        dispatch({
            type: ACCOUNT_DRAGON.FETCH_SUCCESS,
            ...data
        })
    } catch (error) {
        dispatch({ 
            type: ACCOUNT_DRAGON.FETCH_ERROR,
            message: error.response && error.response.data.message ? error.response.data.message : error.response
        })
        console.error(error.response)
    }
}