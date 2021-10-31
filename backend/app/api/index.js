import dragonRouter from './dragon.js'
import generationRouter from './generation.js'

export const registerRoutes = (app) => {
    app.use('/dragon', dragonRouter)
    app.use('/generation', generationRouter)
}