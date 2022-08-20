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
const framer_motion_1 = require("framer-motion");
const fa_1 = require("react-icons/fa");
const SaveDatabaseModal = ({ GetUsersUris, setShowSaveModal }) => {
    const [dbInput, setdbInput] = React.useState();
    //onclick function for the newSave modal save button
    const handleSaveClick = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //get the users URI input
            const dbURI = document.getElementById('userURI').value;
            //get the users New Name input for the saved database
            const name = document.getElementById('newName').value;
            //post request with the 2 user inputs as the body to the '/saveURI' route
            const response = yield axios_1.default.post('/saveURI', { dbURI: dbURI, name: name });
            //if post reqquest successful close modal by settting the show modal to false
            if (response.status == 200) {
                GetUsersUris();
                setShowSaveModal(false);
            }
            else {
                console.log('Error', response);
            }
        }
        catch (err) {
            console.log('Error', err);
        }
    });
    // Function to check letters and numbers
    const alphanumeric = (e) => {
        const letterNumber = /^[0-9a-zA-Z]+$/;
        const newText = e.target.value;
        if (newText.match(letterNumber)) {
            setdbInput(newText);
        }
        else {
            alert("Not alphanumeric");
        }
    };
    return (React.createElement(framer_motion_1.motion.div, { drag: true, key: 'saveURI', initial: { opacity: 0, scale: 0.75, top: 500, right: 50 }, animate: { opacity: 1, scale: 1, top: 500, right: 30, }, exit: { top: -150, right: -100, opacity: 0, scale: 0 }, className: 'save-database-modal-container' },
        React.createElement(framer_motion_1.AnimatePresence, null,
            React.createElement(fa_1.FaTimes, { id: 'close-icon', onClick: () => setShowSaveModal() }),
            React.createElement("label", { htmlFor: "newName" }, "Save Database As:"),
            React.createElement("input", { type: "text", id: "newName", onChange: (e) => alphanumeric(e), value: dbInput }),
            React.createElement("button", { id: "save-btn", onClick: () => handleSaveClick() }, "Save"))));
};
exports.default = SaveDatabaseModal;
//# sourceMappingURL=SaveDatabaseModal.js.map