import express, {Request, Response, NextFunction} from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import router from './router'
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 3000;
export const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  console.log('Node Environment: Production')
  app.use(express.static(path.resolve(__dirname, '../../dist')));
  /*app.get('/', (req: Request, res: Response) => {
    return res.sendFile(path.resolve(__dirname, '../dist/index.html'));
  });*/
}
else app.use(express.static(path.resolve(__dirname, '../client')));

// all routes go through the router
app.use('/', router); 

// error handler
app.use((err, req: Request, res: Response, next: NextFunction) => {
const defaultErr = {
  log: 'Express error handler caught unknown middleware error',
  status: 500,
  message: { err: 'An error occurred' },
};
	const errorObj = Object.assign({}, defaultErr, err);
	console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


app.listen(port, () => {
	console.log('listening on port', port);
});
