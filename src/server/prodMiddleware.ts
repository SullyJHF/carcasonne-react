import express, { Request, Response } from 'express';
import path from 'path';

export default (app: express.Application) => {
  app.use(['/js', '/css'], express.static(path.join(__dirname, '../client')));
  app.get('*', (req: Request, res: Response) => res.sendFile(path.join(__dirname, '../client/index.html')));
};
