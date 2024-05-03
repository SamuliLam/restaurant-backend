import express from 'express';
import cors from 'cors';
import api from './api/index.js';

const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/public', express.static('public'));

app.use('/api/v1', api);

app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

export default app;
