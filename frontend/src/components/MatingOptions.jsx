import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { mateDragon } from "../actions/dragonActions";


const MatingOptions = ({ patronDragonId }) => {
    const [matronDragonId, setMatronDragonId] = useState('');
    const history = useHistory();
    const { dragons } = useSelector(state => state.accountDragons);

    const mate = () => {
        mateDragon({matronDragonId, patronDragonId})
            .then(data => {
                alert(data.message)
                history.push('/dragons')
            })
            .catch(error => alert(error.response.data.message))
    }

    return (
        <div className="input-group mt-4">
            <select className="form-select" onChange={e => setMatronDragonId(e.target.value)}>
                <option value="">Choose your dragons to mate with:</option>
                {
                    dragons.map(dragon => {
                        const { dragonId, generationId, nickname } = dragon;
                        return(
                            <option value={dragonId} key={dragonId}>G{generationId}.I{dragonId}. {nickname}</option>
                        )
                    })
                }
            </select>
            <button className="btn btn-outline-secondary" type="button" onClick={mate}>Sire</button>
        </div>
    )
}

export default MatingOptions
