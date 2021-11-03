import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDragon } from "../actions/dragonActions";
import DragonAvatar from "./DragonAvatar";


const Dragon = () => {
    const dispatch = useDispatch();
    const dragon = useSelector(state => state.dragon)

    // useEffect(() => {
    //     dispatch(fetchDragon())
    // }, [dispatch])

    return dragon && (
        <div>
            <button className="btn btn-dark" onClick={() => dispatch(fetchDragon())}>New Dragon</button>
            <DragonAvatar dragon={dragon} />
        </div>
    )
}

export default Dragon
