import { buyDragon } from "../actions/dragonActions";
import DragonAvatar from "./DragonAvatar"
import { useHistory } from "react-router";


const PublicDragonRow = ({ dragon }) => {
    const history = useHistory();
    const { dragonId, saleValue } = dragon;

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
            <div className="">Sale Value: {dragon.saleValue}</div>
            <br />
            <button type="button" className="btn btn-success" onClick={buy}>Buy</button>
        </div>
    )
}

export default PublicDragonRow
