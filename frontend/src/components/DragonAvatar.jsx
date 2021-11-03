import { skinny, slender, sporty, stocky, patchy, plain, striped, spotted } from '../assets';

const propertyMap = {
    backgroundColor: {
        black: '#263238',
        white: '#cfd8dc',
        green: '#a5d6a7',
        blue: '#0277bd',
    },
    build: { slender, stocky, sporty, skinny },
    pattern: { plain, striped, spotted, patchy },
    size: { small: 120, medium: 140, large: 180, enormous: 220 },
}

const DragonAvatar = ({ dragon }) => {

    const { generationId, dragonId, traits } = dragon;

    // console.log(propertyMap)

    const dragonImage = () => {
        const dragonPropertyMap = {};

        dragon.traits.forEach(trait => {
            const { traitType, traitValue } = trait;

            dragonPropertyMap[traitType] = propertyMap[traitType][traitValue];
        });
        // console.log(dragonPropertyMap);

        const { backgroundColor, build, pattern, size } = dragonPropertyMap;

        const sizing = { width: 200, height: 200 };

        return(
            <div className="dragon-avatar-image-wrapper">
                <div className="dragon-avatar-image-background" style={{ backgroundColor, ...sizing }}></div>
                <img src={pattern} alt="" className="dragon-avatar-image-pattern" style={{ ...sizing }} />
                <img src={build} alt="" className="dragon-avatar-image" style={{ ...sizing }} />
            </div>
    )}

    if(!dragonId) return <div></div>

    return (
        <div>
            <span>G{generationId}</span>
            <span>I{dragonId}. </span>
            { traits.map(trait => trait.traitValue).join(', ') }
            { dragonImage() }
        </div>
    )
}

export default DragonAvatar
