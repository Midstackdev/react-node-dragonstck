import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDragon } from "../actions/dragonActions";
import fetchStates from "../reducers/fetchStates";
import DragonAvatar from "./DragonAvatar";


const Dragon = () => {
    const dispatch = useDispatch();
    const dragon = useSelector(state => state.dragon);
    const { status, message } = dragon;

    // useEffect(() => {
    //     dispatch(fetchDragon())
    // }, [dispatch])

    const dragonView = () => {
        if(status === fetchStates.error) {
            return (<span className="text-danger">{message}</span>)
        }
        return (<DragonAvatar dragon={dragon} />)
    }

    return dragon && (
        <div>
            <button className="btn btn-dark" onClick={() => dispatch(fetchDragon())}>New Dragon</button>
            <br />
            {dragonView()}
        </div>
    )
}

export default Dragon
