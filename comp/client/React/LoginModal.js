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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
const react_1 = require("react");
// import { useCookies, Cookies } from 'react-cookie';
// @ts-ignore
const radiQL_Logo_png_1 = __importDefault(require("../../public/images/radiQL_Logo.png"));
const fa_1 = require("react-icons/fa");
const framer_motion_1 = require("framer-motion");
const LoginModal = ({ setShowLogin, username, setUsername }) => {
    const [notRegistering, setNotRegistering] = (0, react_1.useState)(true);
    const [passwordMatch, setPasswordMatch] = (0, react_1.useState)(true);
    // Handle register Click function
    const handleRegister = () => __awaiter(void 0, void 0, void 0, function* () {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        // If passwords don't match, break && tell user
        if (password !== confirmPassword) {
            setTimeout(() => setPasswordMatch(true), 3000);
            return setPasswordMatch(false);
        }
        try {
            // Send username/password values to server, wait for response
            const response = yield axios_1.default.post('/register', {
                username: username,
                password: password
            });
            setNotRegistering(true);
            console.log(response);
        }
        catch (error) {
            console.log('axios register post error', error);
        }
    });
    // Handle Login click function
    const handleLogin = () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('login attempt');
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        try {
            // Send username/password values to server, wait for response
            const response = yield axios_1.default.post('/login', {
                username: username,
                password: password
            });
            console.log(response.data);
            setUsername(response.data);
        }
        catch (error) {
            console.log('axios login post error', error);
        }
    });
    const handleLogout = () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('logout');
        try {
            const success = yield axios_1.default.get('/logout');
            setUsername('');
        }
        catch (error) {
            console.log('axios logout error', error);
        }
    });
    return (React.createElement(framer_motion_1.motion.div, { drag: true, initial: { opacity: 0, scale: 0.75, top: 0, right: 0, }, animate: { opacity: 1, scale: 1, top: 50, right: 30, }, exit: { top: -150, right: -100, opacity: 0, scale: 0 }, className: "login-modal-container" },
        React.createElement(fa_1.FaTimes, { id: 'close-icon', onClick: () => setShowLogin() }),
        React.createElement("img", { id: "login-logo", src: radiQL_Logo_png_1.default }),
        username === '' ?
            React.createElement("div", { id: "input-modal-container" },
                React.createElement("input", { type: "text", id: "login-username", className: 'login-input', placeholder: "Username", required: true }),
                React.createElement("input", { type: "password", id: "login-password", className: 'login-input', placeholder: "Password", required: true }),
                !notRegistering &&
                    React.createElement("input", { type: "password", id: "register-confirm-password", className: 'login-input', placeholder: "Confirm Password", required: true }),
                React.createElement(framer_motion_1.motion.button, { whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, id: "login-btn", onClick: notRegistering ? () => handleLogin() : () => {
                        console.log(document.cookie);
                        handleRegister();
                    } }, notRegistering ? 'Login' : 'Create Account'),
                notRegistering ? React.createElement("a", { id: "register", onClick: () => setNotRegistering(false), href: '#' }, "Register?")
                    : passwordMatch ? React.createElement("a", { id: "login?", onClick: () => setNotRegistering(true), href: '#' }, "Login?")
                        : React.createElement("p", { className: "login-error-message" }, "Passwords do not match!"))
            ///// If user is logged in, instead display account information and logout button
            : React.createElement("div", { id: "input-modal-container" },
                React.createElement("div", { id: 'username' },
                    "Logged into account: ",
                    username),
                React.createElement(framer_motion_1.motion.button, { whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, id: "login-btn", className: 'logout', onClick: () => handleLogout() }, "Logout"))));
};
exports.default = LoginModal;
//# sourceMappingURL=LoginModal.js.map