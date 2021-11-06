import { useState } from "react"
import { updateDragon } from "../actions/dragonActions";
import DragonAvatar from "./DragonAvatar"

const AccountDragonRow = ({ dragon }) => {
    const [nickname, setNickname] = useState(dragon.nickname);
    const [isPublic, setIsPublic] = useState(dragon.isPublic);
    const [saleValue, setSaleValue] = useState(dragon.saleValue);
    const [edit, setEdit] = useState(false);

    const togdleEdit = () => {
        setEdit(!edit)
        console.log(dragon)
    }
    
    const save = () => {
        // console.log(dragon);
        updateDragon({nickname, isPublic, saleValue, dragonId: dragon.dragonId})
            .then(() => {
                togdleEdit();
            })
    }

    const cancel = () => {
        togdleEdit();
        setNickname(dragon.nickname);
    }
    
    const SaveButton =  (
        <>
            <button type="button" className="btn btn-danger mx-2" onClick={cancel}>Cancel</button>
            <button type="button" className="btn btn-success" onClick={save}>Save</button>
        </>
    )
    
    const EditButton =  (
        <button type="button" className="btn btn-warning" onClick={togdleEdit}>Edit</button>
    )


    return (
        <div>
            <input 
                type="text"
                value={nickname}
                onChange={e => setNickname(e.target.value)} 
                disabled={!edit}
                className={`text-center ${edit && 'form-control' }`}
            />
            {/* <div className="">{nickname}</div> */}
            <DragonAvatar dragon={dragon} />
            <div>
                <span className="mx-3">
                    Sale Value: {' '}
                    <input type="number" 
                        disabled={!edit}
                        value={saleValue}
                        onChange={e => setSaleValue(e.target.value)}
                    />
                </span>
                <span className="mx-3">
                    Public: {' '}
                    <input type="checkbox" 
                        disabled={!edit}
                        checked={isPublic}
                        onChange={e => setIsPublic(e.target.checked)}
                    />
                </span>
                {edit ? SaveButton : EditButton }
            </div>
        </div>
    )
}

export default AccountDragonRow
