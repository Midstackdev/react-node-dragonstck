import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { fetchPublicDragons } from "../actions/dragonActions";
import PublicDragonRow from "../components/PublicDragonRow";


const PublicDragons = () => {
    const { dragons, status } = useSelector(state => state.publicDragons);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPublicDragons());
    },[dispatch])

    return (
        <div>
            <h3>Public Dragons</h3>
            <br />
            {dragons.map(dragon => (
                <div key={dragon.dragonId}>
                    <PublicDragonRow dragon={dragon} />
                    <hr />
                </div>
            ))}
            <Link to="/">Home</Link>
        </div>
    )
}

export default PublicDragons
