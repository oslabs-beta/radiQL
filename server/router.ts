import express, {Request, Response} from "express"; 
import controller from './controller';
// import path from 'path';

const router = express.Router();


// received: PG URI
router.post('/submitURI', controller.saveURI, controller.getTableData, controller.getAllColumns, controller.makeSchemas, (req: Request, res: Response) => {
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

router.get('/uris', controller.getUris, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.uris);
})

export default router;
