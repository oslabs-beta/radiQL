import express, {Request, Response} from "express"; 
import controller from './controller';

const router = express.Router();

/**
 * Receives a database URI and, provided that it is valid, responds with an object in the form:
 * { schema: string, resolver: string}
 */
router.post('/submitURI', controller.saveURI, controller.getTableData, controller.getAllColumns, controller.makeSchemas, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.output); 
})

/**
 * Receives username and password strings in request body and establishes user in database.
 */
router.post(
  '/register',
  controller.register,
  controller.setUserCookie,
  (req: Request, res: Response) => {
    return res.sendStatus(201);
  }
);

/**
 * Receives username and password strings in request body and attempts login using info. 
 */
router.post(
  '/login',
  controller.login,
  controller.setUserCookie,
  (req: Request, res: Response) => {
    return res.sendStatus(200);
  }
);

/**
 * Returns stored URIs for a user. 
 */
router.get('/uris', controller.getUris, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.uris);
})

export default router;
