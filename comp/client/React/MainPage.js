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
const framer_motion_1 = require("framer-motion");
const fa_1 = require("react-icons/fa");
const SavedDatabases_1 = __importDefault(require("./SavedDatabases"));
const dummyCode_1 = __importDefault(require("../dummyCode"));
// Components: 
const codeBlock_1 = __importDefault(require("./codeBlock"));
const MountainLogo_1 = __importDefault(require("./MountainLogo"));
const SaveDatabaseModal_1 = __importDefault(require("./SaveDatabaseModal"));
const MainPage = ({ username }) => {
    // State to switch between tabs on the CodeBody component
    const [currentTab, changeTab] = (0, react_1.useState)(1);
    // Code input for the Schema tab
    const [schemaBody, setschemaBody] = (0, react_1.useState)(dummyCode_1.default.dummySchema);
    // Code input for the Resolver tab
    const [resolverBody, setresolverBody] = (0, react_1.useState)(dummyCode_1.default.dummyResolver);
    // Current instruction step (either 1, 2 or 3)
    const [instruction, setInstruction] = (0, react_1.useState)(1);
    // Current value of the URI input field
    const [selectedDatabase, setSelectedDatabase] = (0, react_1.useState)('');
    // State that shows or hides the SaveDatabaseModal component
    const [showSaveModal, setShowSaveModal] = React.useState(false);
    // Saved databases that are displayed when logged in
    const [savedUris, setSavedUris] = React.useState(null);
    // Save the last sent URI
    const [lastURI, setLastURI] = React.useState(null);
    //send uri request
    const handleConvertURI = () => __awaiter(void 0, void 0, void 0, function* () {
        const blurBox = (document.getElementById('blur-container'));
        const dbURI = document.getElementById('userURI').value;
        try {
            blurBox === null || blurBox === void 0 ? void 0 : blurBox.classList.remove('hidden');
            const response = yield axios_1.default.post('/submitURI', { dbURI: dbURI });
            if (response.data.schema) {
                setLastURI(dbURI);
                if (instruction === 1) {
                    const stepOne = document.getElementById('1');
                    const stepTwo = document.getElementById('2');
                    stepOne.classList.remove('current-step');
                    stepTwo.classList.add('current-step');
                    setInstruction(2);
                }
                setschemaBody(response.data.schema);
                setresolverBody(response.data.resolver);
            }
        }
        catch (err) {
            console.log('dbURI', err);
        }
        // Unblur
        setTimeout(() => { blurBox === null || blurBox === void 0 ? void 0 : blurBox.classList.add('hidden'); }, 500);
        // blurBox?.classList.add('hidden');
    });
    // Get URIS Function: Axios request to server  route '/uris' 
    const GetUsersUris = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Post body includes current users ID from cookie.SSID
            const { data, status } = yield axios_1.default.get('/uris', { withCredentials: true });
            // console.log(JSON.stringify(data));
            // console.log('response status is: ', status);
            // Set saved uris state to the response of the axios request
            setSavedUris(data);
        }
        catch (error) {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    });
    return (React.createElement("div", { id: 'main-content', className: 'mainContent' },
        React.createElement("div", { id: 'dynamic-about', className: 'dynamicAbout left-1' },
            showSaveModal && React.createElement(SaveDatabaseModal_1.default, { GetUsersUris: GetUsersUris, setShowSaveModal: setShowSaveModal }),
            React.createElement("h1", null, "How to use radiQL:"),
            React.createElement("div", { id: "circles-container" },
                React.createElement("span", { id: '1', className: 'circle current-step' }, instruction > 1 ? React.createElement(fa_1.FaCheck, { style: { 'color': 'lime' } }) : 1),
                React.createElement(fa_1.FaArrowRight, null),
                React.createElement("span", { id: '2', className: 'circle' }, instruction > 2 ? React.createElement(fa_1.FaCheck, { style: { 'color': 'lime' } }) : '2'),
                React.createElement(fa_1.FaArrowRight, null),
                React.createElement("span", { id: '3', className: 'circle' }, "3")),
            React.createElement("section", { id: "instructions" },
                React.createElement("h2", { className: instruction === 1 ? '' : 'gray' }, "1. Paste your URI below and click \"Convert!\""),
                React.createElement("h2", { className: instruction === 2 ? '' : 'gray' },
                    "2. Click \"",
                    React.createElement(fa_1.FaClipboardList, { style: { 'display': 'inline-block' } }),
                    "\" in the output code block to copy the current page"),
                React.createElement("h2", { className: instruction === 3 ? '' : 'gray' }, "3. Paste code into your server to begin using GraphQL")),
            React.createElement("div", { id: "uri-input-container", className: 'p-2' },
                React.createElement("input", { id: 'userURI', type: "text", placeholder: ' Your Database URI', value: selectedDatabase, onChange: (e) => setSelectedDatabase(e.target.value) }),
                React.createElement(framer_motion_1.motion.button, { whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, id: 'convert-btn', onClick: () => handleConvertURI() }, "Convert!"),
                username ?
                    React.createElement(framer_motion_1.motion.button, { whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, id: 'save-database-btn', onClick: () => setShowSaveModal(true) }, "Save Database")
                    : React.createElement("button", { id: 'disabled-save', disabled: true }, "Log In To Save Database"),
                username && React.createElement(SavedDatabases_1.default, { savedUris: savedUris, GetUsersUris: GetUsersUris, username: username, setSelectedDatabase: setSelectedDatabase })),
            React.createElement("div", { className: 'stats left-2' },
                "Last URI Submitted: ",
                lastURI)),
        React.createElement(codeBlock_1.default, { schemaBody: schemaBody, resolverBody: resolverBody, setInstruction: setInstruction, currentTab: currentTab, changeTab: changeTab, lastURI: lastURI }),
        React.createElement("div", { id: 'blur-container', className: 'hidden' },
            React.createElement(MountainLogo_1.default, null))));
};
exports.default = MainPage;
//# sourceMappingURL=MainPage.js.map