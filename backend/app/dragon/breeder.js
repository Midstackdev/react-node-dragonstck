import { base64Encode } from "../account/helper.js";
import Dragon from "./index.js";

class Breeder {
    static breedDragon({ matron, patron }) {
        const matronTraits = matron.traits;
        const patronTraits = patron.traits;

        const babyTraits = [];

        matronTraits.forEach(({ traitType, traitValue}) => {
            const matronTrait = traitValue;

            const patronTrait = patronTraits.find(
                trait => trait.traitType === traitType
            ).traitValue;

            // console.log('pt', patronTrait)

            babyTraits.push({
                traitType,
                traitValue: Breeder.pickTrait({ matronTrait, patronTrait})
            });
        });

        // console.log('babyTs', babyTraits)

        return new Dragon({ nickname: 'Unnamed baby', traits: babyTraits });
    }

    // Two incomming traits: matronTrait and PatronTrait
    // The matronTriat and patronTrait string values are encoded.
    // Both traits have their characters summed.
    // Get a range by adding both character sums.
    // Generate a random number, in that range.
    // If the number is less than the matron's character sum, pick matron.
    // Else, pick. patron
    static pickTrait({ matronTrait, patronTrait }) {
        if(matronTrait === patronTrait) return matronTrait;

        const matronTraitCharSum = Breeder.charSum(base64Encode(matronTrait));
        const patronTraitCharSum = Breeder.charSum(base64Encode(patronTrait));

        const randNum = Math.floor(Math.random() * (matronTraitCharSum + patronTraitCharSum));

        return randNum < matronTraitCharSum ? matronTrait : patronTrait;
    }

    static charSum (string) {
         return string.split('').reduce(
             (sum, character) => sum =+ character.charCodeAt(),
             0
         );
    }
}

// const lama = new Dragon()
// const gama = new Dragon()
// console.log('lama', lama)
// console.log('gama', gama)
// let splitter = Breeder.breedDragon({ matron:lama, patron:gama })
// console.log('splitter', splitter)

export default Breeder