"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const router_1 = __importDefault(require("./router"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT || 3000;
exports.app = (0, express_1.default)();
exports.app.use(body_parser_1.default.json());
exports.app.use(body_parser_1.default.urlencoded({ extended: true }));
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use((0, cookie_parser_1.default)());
if (process.env.NODE_ENV === 'production') {
    console.log('Node Environment: Production');
    exports.app.use(express_1.default.static(path_1.default.resolve(__dirname, '../../dist')));
    /*app.get('/', (req: Request, res: Response) => {
      return res.sendFile(path.resolve(__dirname, '../dist/index.html'));
    });*/
}
else
    exports.app.use(express_1.default.static(path_1.default.resolve(__dirname, '../client')));
// all routes go through the router
exports.app.use('/', router_1.default);
// error handler
exports.app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});
exports.app.listen(port, () => {
    console.log('listening on port', port);
});
//# sourceMappingURL=server.js.map