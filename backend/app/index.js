import express from "express";
import { registerRoutes } from "./api/index.js";
import GenerationEngine from "./generation/engine.js";

const app = express();

const engine = new GenerationEngine();

app.locals.engine = engine;

registerRoutes(app);

engine.start();



export default app;