/*
functionality required:
input: database
schema generation based on table row types
resolver generation based on schema?
*/
import express, {Request, Response} from "express"; 
import controller from './controller';
// import path from 'path';

const router = express.Router();


// received: PG URI
router.post('/submitURI', controller.getTableData, controller.getAllColumns, controller.makeSchemas, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.output); 
})

router.post(
  '/register',
  controller.register,
  controller.setUserCookie,
  (req: Request, res: Response) => {
    return res.sendStatus(201);
  }
);

router.post(
  '/login',
  controller.login,
  controller.setUserCookie,
  (req: Request, res: Response) => {
    return res.sendStatus(200);
  }
);

export default router;
