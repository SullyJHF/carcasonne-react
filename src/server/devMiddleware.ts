import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import webpackOptions from '../../webpack.config';

export default (app: express.Application) => {
  const compiler = webpack(webpackOptions.filter((opt) => opt.name === 'client'));
  app.use(WebpackDevMiddleware(compiler));
  app.use(WebpackHotMiddleware(compiler));
  app.get('*', (req: Request, res: Response, next: NextFunction) => {
    const [clientCompiler] = compiler.compilers.filter((comp) => comp.name === 'client');
    const filename = path.join(clientCompiler.outputPath, 'index.html');
    clientCompiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('content-type', 'text/html');
      res.send(result);
      return res.end();
    });
  });
};
