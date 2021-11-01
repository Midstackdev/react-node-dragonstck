import express from "express";
import { registerRoutes } from "./api/index.js";
import GenerationEngine from "./generation/engine.js";

const app = express();

const engine = new GenerationEngine();

app.locals.engine = engine;

registerRoutes(app);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({ 
        type: 'error', 
        message: err.message 
    })
});

engine.start();



export default app;