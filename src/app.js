import express from 'express';
import cors from 'cors';
import api from './api/index.js';

const app = express();
app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/public', express.static('public'));

app.use('/api/v1', api);

app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

export default app;
