import axios from "axios"
import { DRAGON, PUBLIC_DRAGON } from "../constants/dragonConstants"

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

const fetchWithAxios = ({ options, FETCH_TYPE, SUCCESS_TYPE, ERROR_TYPE }) => async(dispatch) => {
    dispatch({ type: FETCH_TYPE })
    try {
        const {data} = await axios(options);
        dispatch({
            type: SUCCESS_TYPE,
            ...data
        })
    } catch (error) {
        dispatch({ 
            type: ERROR_TYPE,
            message: error.response && error.response.data.message ? error.response.data.message : error.response
        })
        console.error(error.response)
    }
}

export const updateDragon = async(formData) => {
    try {
        const {data} = await axios.put(`dragon/update`,  formData);
        // console.log(data)
        return data;
    } catch (error) {
        console.error(error.response);
    }
}

export const buyDragon = async(formData) => {
    try {
        const {data} = await axios.post(`dragon/buy`,  formData);
        // console.log(data)
        return data;
    } catch (error) {
        console.error(error.response);
    }
}

export const fetchPublicDragons = () => fetchWithAxios({
    options: {
        method: 'get',
        url: 'dragon/public',
    },
    FETCH_TYPE: PUBLIC_DRAGON.FETCH,
    ERROR_TYPE: PUBLIC_DRAGON.FETCH_ERROR,
    SUCCESS_TYPE: PUBLIC_DRAGON.FETCH_SUCCESS
});