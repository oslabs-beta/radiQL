import express, {NextFunction, Request, Response} from "express"; 
import controller from './controller';

const router = express.Router();

/**
 * Receives a database URI and, provided that it is valid, responds with an object in the form:
 * { schema: string, resolver: string}
 */
router.post('/submitURI', controller.getTableData, controller.getAllColumns, controller.makeSchemas, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.output); 
});

/**
 * Receives a URI in request body and, provided user is logged in, saves the URI. 
 * Nothing happens if the user is not logged in. 
 */
router.post('/saveURI', controller.saveURI, (req: Request, res: Response, next: NextFunction) => {
  return res.status(200); 
})

/**
 * Receives username and password strings in request body and establishes user in database.
 */
router.post(
  '/register',
  controller.register,
  controller.setUserCookie,
  (req: Request, res: Response) => {
    console.log('Responding to /register');
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
    console.log('Responding to /login');
    return res.status(200).json(res.locals.user.username);
  }
);

/**
 * Returns the username for a logged in user
 */
router.get('/getUsername', controller.isLoggedIn, (req: Request, res: Response) => {
  console.log('Responding to /getUsername');
  return res.status(200).json(res.locals.username);
});

/**
 * Logs out a user - clears their SSID and username cookies
 */
router.get('/logout', (req: Request, res: Response) => {
  console.log('Responding to /logout');
  return res.clearCookie('SSID').clearCookie('username').sendStatus(204);
});

/**
 * Returns stored URIs for a user. 
 */
router.get('/uris', controller.getUris, (req: Request, res: Response) => {
  console.log('Responding to /uris');
  return res.status(200).json(res.locals.uris);
})

/**
 * Returns default express/node server with graphql implemented. 
 */
router.get('/defaultbp', 
  controller.getTableData, controller.getAllColumns, controller.makeSchemas, 
  controller.defaultBoilerplate, 
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.boilerplate); 
});

/**
 * Returns apollo-express server with graphql implemented
 */
router.get('/apollobp', 
  controller.getTableData, controller.getAllColumns, controller.makeSchemas,
  controller.apolloBoilerplate, 
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.apollobp); 
  }
)

export default router;
