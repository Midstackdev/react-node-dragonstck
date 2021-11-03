import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import { registerRoutes } from "./api/index.js";
import GenerationEngine from "./generation/engine.js";

dotenv.config()

const app = express();

const engine = new GenerationEngine();

app.locals.engine = engine;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({ origin: 'http://localhost:3000' }));

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