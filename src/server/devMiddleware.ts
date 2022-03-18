import webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import webpackOptions from '../../webpack.config';

export default (app: express.Application) => {
  const compiler = webpack(webpackOptions.filter((opt) => opt.name === 'client'));
  app.use(WebpackDevMiddleware(compiler));
  app.use(WebpackHotMiddleware(compiler));
  app.get('*', (req, res, next) => {
    const [clientCompiler] = compiler.compilers;
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
