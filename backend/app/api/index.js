import dragonRouter from './dragon.js'
import generationRouter from './generation.js'
import accountRouter from './account.js'

export const registerRoutes = (app) => {
    app.use('/dragon', dragonRouter)
    app.use('/generation', generationRouter)
    app.use('/account', accountRouter)
}