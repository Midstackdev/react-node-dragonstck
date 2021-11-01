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
        const generation = new Generation();

        GenerationTable.storeGeneration(generation)
            .then(({ generationId }) => {
                this.generation = generation;

                this.generation.generationId = generationId;
                
                console.log('new generation', this.generation);
        
                this.timer = setTimeout(
                    () => this.buildNewgeneration(), 
                    this.generation.expiration.getTime() - Date.now()
                );
            })
            .catch(error => console.log(error));

    }
}

export default GenerationEngine;