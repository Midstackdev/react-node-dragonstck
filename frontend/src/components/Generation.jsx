import { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios'

const DEFAULT_GENERATION = { expiration: '', generationId: '' };
const MINIMUM_DELAY = 3000;

const Generation = () => {
    const [generation, setGeneration] = useState(DEFAULT_GENERATION);
    let timer = useRef(null);

    const fetchGeneration = useCallback(async() => {
        try {
            const {data} = await axios.get(`generation`)
            setGeneration(data.generation)
        } catch (error) {
            console.error(error)
        }
    }, [])

    const fetchNextGeneration = useCallback(() => {
        fetchGeneration();

        let delay = new Date(generation.expiration).getTime() - new Date().getTime();
        
        if(delay < MINIMUM_DELAY) {
            delay = MINIMUM_DELAY;
        }

        timer.current = setTimeout(() => fetchNextGeneration(), delay);
    }, [fetchGeneration, generation.expiration])
    
    useEffect(() => {
        fetchNextGeneration()
    }, [fetchNextGeneration])

    useEffect(() => {
        
        return () => {
            clearTimeout(timer);
            console.log('out')
        }
    }, [])

    return generation && (
        <div>
            <h3>Generation {generation.generationId}. Expires on:</h3>
            <h4>{new Date(generation.expiration).toString()}</h4>
        </div>
    )
}

export default Generation
