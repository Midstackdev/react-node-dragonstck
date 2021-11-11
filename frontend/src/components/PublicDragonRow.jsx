import { buyDragon } from "../actions/dragonActions";
import DragonAvatar from "./DragonAvatar"
import { useHistory } from "react-router";
import { useState } from "react";
import MatingOptions from "./MatingOptions";


const PublicDragonRow = ({ dragon }) => {
    const [displayMatingOptions, setDisplayMatingOptions] = useState(false)
    const history = useHistory();
    const { dragonId, saleValue } = dragon;

    const toggleDisplayMatingOptions = () => {
        setDisplayMatingOptions(!displayMatingOptions)
    }

    const buy = () => {
        buyDragon({ dragonId, saleValue })
        .then(data => {
            alert(data.message)
            history.push('/dragons')
        })
    }
    
    return (
        <div>
            <div className="">{dragon.nickname}</div>
            <DragonAvatar dragon={dragon} />
            <div className="">
                <span className="mx-4">
                    Sale Value: {dragon.saleValue}
                </span>{' | '}
                <span className="mx-2">
                    Sire Value: {dragon.sireValue}
                </span>
            </div>
            <br />
            <button type="button" className="btn btn-success mx-3" onClick={buy}>Buy</button>
            <button type="button" className="btn btn-warning -mx-3" onClick={toggleDisplayMatingOptions}>{!displayMatingOptions ? 'Sire' : 'Back'}</button>
            {
                displayMatingOptions && <MatingOptions patronDragonId={dragonId} />
            }
        </div>
    )
}

export default PublicDragonRow
