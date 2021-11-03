import { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGeneration } from '../actions/generationActions';
import fetchStates from '../reducers/fetchStates';

const MINIMUM_DELAY = 3000;

const Generation = () => {
    
    const timer = useRef(null);
    const dispatch = useDispatch();
    const generation = useSelector(state => state.generation)

    const { generationId, expiration, status } = generation;

    const fetchNextGeneration = useCallback(() => {
        dispatch(fetchGeneration());

        let delay = new Date(expiration).getTime() - new Date().getTime();
        
        if(delay < MINIMUM_DELAY) {
            delay = MINIMUM_DELAY;
        }

        timer.current = setTimeout(() => fetchNextGeneration(), delay);
    }, [dispatch, expiration])
    
    useEffect(() => {
        fetchNextGeneration()
    }, [fetchNextGeneration])

    useEffect(() => {
        
        return () => {
            clearTimeout(timer);
            console.log('out')
        }
    }, [])

    if(status === fetchStates.error) {
        return (<div>{generation.message}</div>)
    }

    return generation && (
        <div>
            <h3>Generation {generationId}. Expires on:</h3>
            <h4>{new Date(expiration).toString()}</h4>
        </div>
    )
}

export default Generation
