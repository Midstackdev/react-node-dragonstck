import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import DragonAvatar from "./DragonAvatar";


const DEFAULT_DRAGON = { traits: [], generationId: '', dragonId: '' };

const Dragon = () => {
    const [dragon, setDragon] = useState(DEFAULT_DRAGON);

    // const { generationId, dragonId, traits } = dragon;

    const fetchDragon = useCallback(async() => {
        try {
            const {data} = await axios.get(`dragon/new`)
            setDragon(data.dragon)
        } catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(() => {
        fetchDragon()
    }, [fetchDragon])

    return dragon && (
        <div>
            <button className="btn btn-dark" onClick={fetchDragon}>New Dragon</button>
            <DragonAvatar dragon={dragon} />
        </div>
    )
}

export default Dragon
