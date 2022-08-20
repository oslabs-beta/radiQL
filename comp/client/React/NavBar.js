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
// @ts-ignore
const radiQL_Logo2_png_1 = __importDefault(require("../../public/images/radiQL_Logo2.png"));
const LoginModal_1 = __importDefault(require("./LoginModal"));
const framer_motion_1 = require("framer-motion");
const NavBar = ({ username, setUsername }) => {
    const [showLogin, setShowLogin] = React.useState(false);
    return (React.createElement("div", { className: "navbar" },
        React.createElement(framer_motion_1.motion.div, { className: "box", animate: {
                // scale: [1, 1, 1],
                rotate: [0, 8, 0 - 8, 0],
            }, transition: {
                duration: .5,
                ease: "easeInOut",
                times: [0, 1],
                repeat: Infinity,
                repeatDelay: 15
            } },
            React.createElement(react_router_dom_1.Link, { id: "logo", className: "nav-link", to: "/" },
                React.createElement("img", { id: "logo", src: radiQL_Logo2_png_1.default }))),
        React.createElement("div", { className: "links" },
            React.createElement(react_router_dom_1.Link, { className: "nav-link", to: "/About" }, "About Us"),
            React.createElement("a", { className: "nav-link", href: "https://medium.com/" }, "Medium Article"),
            React.createElement("a", { className: "nav-link", href: "https://github.com/oslabs-beta/radiQL" }, "Github"),
            React.createElement("a", { id: "login", onClick: () => setShowLogin(!showLogin), className: "nav-link" }, username === '' ? 'Login' : 'My Account'),
            React.createElement(framer_motion_1.motion.div, null,
                React.createElement(framer_motion_1.AnimatePresence, null, showLogin && (React.createElement(LoginModal_1.default, { setShowLogin: setShowLogin, username: username, setUsername: setUsername })))))));
};
exports.default = NavBar;
//# sourceMappingURL=NavBar.js.map