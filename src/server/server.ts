import express from 'express';
import http from 'http';
import devMiddleware from './devMiddleware';
import prodMiddleware from './prodMiddleware';
import { initSocketIO } from './sockets/sockets';

const PORT = process.env.PORT || 3000;

const app = express();
const httpServer = http.createServer(app);

initSocketIO(httpServer);

if (process.env.NODE_ENV === 'production') prodMiddleware(app);
else devMiddleware(app);

httpServer.listen(PORT, () => { console.log(`Listening on port: ${PORT}`); });
