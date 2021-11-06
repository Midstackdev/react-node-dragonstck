import { fetchFromAccountAxios } from './accountActions';
import { ACCOUNT_INFO } from '../constants/accountConstants'

export const fetchAccountInfo = () => fetchFromAccountAxios({
    options: {
        method: 'get',
        url: 'account/info',
    },
    FETCH_TYPE: ACCOUNT_INFO.FETCH,
    ERROR_TYPE: ACCOUNT_INFO.FETCH_ERROR,
    SUCCESS_TYPE: ACCOUNT_INFO.FETCH_SUCCESS
});