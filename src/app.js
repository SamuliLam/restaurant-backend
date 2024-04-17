import express from 'express';
import apiRouter from './api/index.js';


const app = express();

app.use('/api/v1', apiRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

export default app;
