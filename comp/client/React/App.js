"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
// Components: 
const About_1 = __importDefault(require("./About"));
const NavBar_1 = __importDefault(require("./NavBar"));
const MainPage_1 = __importDefault(require("./MainPage"));
const axios_1 = __importDefault(require("axios"));
const App = () => {
    const [username, setUsername] = React.useState('');
    React.useEffect(() => {
        // setUsername('Alex');
        axios_1.default.get('/getUsername')
            .then((res) => {
            console.log(res.data);
            setUsername(res.data);
        });
    }, []);
    return (React.createElement("div", { className: 'body' },
        React.createElement(NavBar_1.default, { username: username, setUsername: setUsername }),
        React.createElement(react_router_dom_1.Routes, null,
            React.createElement(react_router_dom_1.Route, { path: "/About", element: React.createElement(About_1.default, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/", element: React.createElement(MainPage_1.default, { username: username }) }))));
};
exports.default = App;
//# sourceMappingURL=App.js.map