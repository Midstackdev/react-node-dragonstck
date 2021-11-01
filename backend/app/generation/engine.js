import Generation from "./index.js";
import GenerationTable from "./table.js";

class GenerationEngine {
    constructor() {
        this.generation = null
        this.timer = null
    }

    start() {
        this.buildNewgeneration();
    }

    stop() {
        clearTimeout(this.timer);
    }

    buildNewgeneration() {
        this.generation = new Generation();

         GenerationTable.storeGeneration(this.generation);

        console.log('new generation', this.generation);

        this.timer = setTimeout(
            () => this.buildNewgeneration(), 
            this.generation.expiration.getTime() - Date.now()
        );
    }
}

export default GenerationEngine;