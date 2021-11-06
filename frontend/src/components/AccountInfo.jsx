import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountInfo } from "../actions/accountInfoActions";


const AccountInfo = () => {
    const { username, balance, status } = useSelector(state => state.accountInfo)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAccountInfo())
    }, [dispatch])

    return (
        <div>
            <h3>Account Info</h3>
            <div className="">Username: {username}</div>
            <div className="">Balance: {balance}</div>
        </div>
    )
}

export default AccountInfo;
