import express from 'express';
import apiRouter from './api/index.js';

const app = express();

app.use('/api/v1', apiRouter);

export default app;
