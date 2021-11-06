import axios from "axios"
import { ACCOUNT } from "../constants/accountConstants"

const fetchFromAccount = ({ endpoint, options, SUCCESS_TYPE }) => async(dispatch) => {
    dispatch({ type: ACCOUNT.FETCH })
    try {
        const {data} = await axios.post(`account/${endpoint}`, options.formData);
        dispatch({
            type: SUCCESS_TYPE,
            ...data
        })
    } catch (error) {
        dispatch({ 
            type: ACCOUNT.FETCH_ERROR,
            message: error.response && error.response.data.message ? error.response.data.message : error.response
        })
        console.error(error.response)
    }
}

export const fetchFromAccountAxios = ({ options, FETCH_TYPE, SUCCESS_TYPE, ERROR_TYPE }) => async(dispatch) => {
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

export const signup = (formData) => fetchFromAccount({
    endpoint: 'signup',
    options: {
        formData,
        // method: post,
    },
    SUCCESS_TYPE: ACCOUNT.FETCH_SUCCESS
}); 

export const login = (formData) => fetchFromAccount({
    endpoint: 'login',
    options: {
        formData,
        // method: post,
    },
    SUCCESS_TYPE: ACCOUNT.FETCH_SUCCESS
}); 

// export const signup = (formData) => async(dispatch) => {
//     dispatch({ type: ACCOUNT.FETCH })
//     try {
//         const {data} = await axios.post(`account/signup`, formData);
//         dispatch({
//             type: ACCOUNT.FETCH_SUCCESS,
//             ...data
//         })
//     } catch (error) {
//         dispatch({ 
//             type: ACCOUNT.FETCH_ERROR,
//             message: error.response && error.response.data.message ? error.response.data.message : error.response
//         })
//         console.error(error.response)
//     }
// }

export const logout = () => async(dispatch) => {
    dispatch({ type: ACCOUNT.FETCH })
    try {
        const {data} = await axios.get(`account/logout`);
        dispatch({
            type: ACCOUNT.FETCH_LOGOUT_SUCCESS,
            ...data
        })
    } catch (error) {
        dispatch({ 
            type: ACCOUNT.FETCH_ERROR,
            message: error.response && error.response.data.message ? error.response.data.message : error.response
        })
        console.error(error.response)
    }
}

export const fetchAuthenticated = () => async(dispatch) => {
    dispatch({ type: ACCOUNT.FETCH })
    try {
        const {data} = await axios.get(`account/auth`);
        console.log(data)
        dispatch({
            type: ACCOUNT.FETCH_AUTHENTICATED_SUCCESS,
            ...data
        })
    } catch (error) {
        dispatch({ 
            type: ACCOUNT.FETCH_ERROR,
            message: error.response && error.response.data.message ? error.response.data.message : error.response
        })
        console.error(error.response)
    }
}