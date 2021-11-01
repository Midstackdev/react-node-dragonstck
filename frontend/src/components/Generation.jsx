import { useEffect, useState } from 'react'
import axios from 'axios'


const Generation = () => {
    const [generation, setGeneration] = useState(null)

    useEffect(() => {
        const getGeneration = async() => {
            try {
                const {data} = await axios.get(`generation`)
                setGeneration(data.generation)
            } catch (error) {
                console.error(error)
            }
        }
        getGeneration()
    }, [])

    return generation && (
        <div>
            <h3>Generation {generation.generationId}. Expires on:</h3>
            <h4>{new Date(generation.expiration).toString()}</h4>
        </div>
    )
}

export default Generation
