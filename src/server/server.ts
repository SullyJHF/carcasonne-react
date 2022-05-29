import express from 'express';
import http from 'http';
import path from 'path';
import devMiddleware from './devMiddleware';
import prodMiddleware from './prodMiddleware';
import GameManager from './sockets/models/GameManager';
import { initSocketIO } from './sockets/sockets';

const PORT = process.env.PORT || 3000;

const app = express();
const httpServer = http.createServer(app);

initSocketIO(httpServer);

app.use('/images', express.static(path.resolve(__dirname, 'public', 'images')));

if (process.env.NODE_ENV === 'production') prodMiddleware(app);
else devMiddleware(app);

httpServer.listen(PORT, () => {
  console.log(`Carcasonne now available at http://localhost:${PORT}`);
  GameManager.createGame();
});
