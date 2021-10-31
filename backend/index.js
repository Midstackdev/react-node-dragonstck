import Generation from "./generation.js";
import GenerationEngine from "./engine.js";

const engine = new GenerationEngine();

engine.start();

setTimeout(() => {
    engine.stop();
}, 20000);
// const generation = new Generation();
// console.log('generation', generation)

// const goobey = generation.newDragon()

// console.log('goobey', goobey)

// setTimeout(() => {
//     const mimar = generation.newDragon()

//     console.log('mimar', mimar)
// }, 15000)