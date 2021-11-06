import DragonAvatar from "./DragonAvatar"


const PublicDragonRow = ({ dragon }) => {
    return (
        <div>
            <div className="">{dragon.nickname}</div>
            <DragonAvatar dragon={dragon} />
            <div className="">Sale Value: {dragon.saleValue}</div>
        </div>
    )
}

export default PublicDragonRow
