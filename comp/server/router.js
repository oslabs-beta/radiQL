"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
const router = express_1.default.Router();
/**
 * Receives a database URI and, provided that it is valid, responds with an object in the form:
 * { schema: string, resolver: string}
 */
router.post('/submitURI', controller_1.default.getTableData, controller_1.default.getAllColumns, controller_1.default.makeSchemas, (req, res) => {
    return res.status(200).json(res.locals.output);
});
/**
 * Receives a URI in request body and, provided user is logged in, saves the URI.
 * Nothing happens if the user is not logged in.
 */
router.post('/saveURI', controller_1.default.saveURI, (req, res, next) => {
    return res.sendStatus(200);
});
/**
 * Receives username and password strings in request body and establishes user in database.
 */
router.post('/register', controller_1.default.register, controller_1.default.setUserCookie, (req, res) => {
    console.log('Responding to /register');
    return res.sendStatus(201);
});
/**
 * Receives username and password strings in request body and attempts login using info.
 */
router.post('/login', controller_1.default.login, controller_1.default.setUserCookie, (req, res) => {
    console.log('Responding to /login');
    return res.status(200).json(res.locals.user.username);
});
/**
 * Returns the username for a logged in user
 */
router.get('/getUsername', controller_1.default.isLoggedIn, (req, res) => {
    console.log('Responding to /getUsername');
    return res.status(200).json(res.locals.username);
});
/**
 * Logs out a user - clears their SSID and username cookies
 */
router.get('/logout', (req, res) => {
    console.log('Responding to /logout');
    return res.clearCookie('SSID').clearCookie('username').sendStatus(204);
});
/**
 * Returns stored URIs for a user.
 */
router.get('/uris', controller_1.default.getUris, (req, res) => {
    console.log('Responding to /uris');
    return res.status(200).json(res.locals.uris);
});
/**
 * Returns default express/node server with graphql implemented.
 */
router.post('/defaultbp', controller_1.default.getTableData, controller_1.default.getAllColumns, controller_1.default.makeSchemas, controller_1.default.defaultBoilerplate, (req, res) => {
    return res.status(200).json(res.locals.boilerplate);
});
/**
 * Returns apollo-express server with graphql implemented
 */
router.post('/apollobp', controller_1.default.getTableData, controller_1.default.getAllColumns, controller_1.default.makeSchemas, controller_1.default.apolloBoilerplate, (req, res) => {
    return res.status(200).json(res.locals.apollobp);
});
exports.default = router;
//# sourceMappingURL=router.js.map