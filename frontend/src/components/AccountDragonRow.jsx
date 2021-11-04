import DragonAvatar from "./DragonAvatar"

const AccountDragonRow = ({ dragon }) => {
    return (
        <div>
            <div className="">{dragon.nickname}</div>
            <DragonAvatar dragon={dragon} />
        </div>
    )
}

export default AccountDragonRow
