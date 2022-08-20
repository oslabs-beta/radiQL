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
const react_1 = require("react");
const fa_1 = require("react-icons/fa");
const react_code_blocks_1 = require("react-code-blocks");
const axios_1 = __importDefault(require("axios"));
const BoilerPlateCode_jsx_1 = __importDefault(require("./BoilerPlateCode.jsx"));
// const finalCode = genBoilerPLate(serverOption, dummyFetchedCode);
const CodeBlock = ({ schemaBody, resolverBody, setInstruction, currentTab, changeTab, lastURI }) => {
    const [boilerPlateCode, setBoilerPlateCode] = (0, react_1.useState)(BoilerPlateCode_jsx_1.default);
    const [boilerPlateSelection, setBoilerSelection] = (0, react_1.useState)('No boilerplate code');
    (0, react_1.useEffect)(() => {
        console.log(BoilerPlateCode_jsx_1.default, boilerPlateCode);
        const clipboardIcon = document.querySelector('.icon');
        console.log(clipboardIcon);
        clipboardIcon.addEventListener('click', () => {
            const stepThree = document.getElementById('3');
            const stepTwo = document.getElementById('2');
            const stepOne = document.getElementById('1');
            stepThree.classList.add('current-step');
            stepTwo.classList.remove('current-step');
            stepOne.classList.remove('current-step');
            console.log('clipboard clicked');
            setInstruction(3);
        });
    }, []);
    // When boilerPlateSelection is changed,
    (0, react_1.useEffect)(() => {
        if (boilerPlateSelection === 'No boilerplate code') {
            setBoilerPlateCode(BoilerPlateCode_jsx_1.default);
            return;
        }
        if (lastURI === null) {
            console.log('No URI submitted yet, please submit a URI to generate boilerplate code');
            return;
        }
        // Get cached boilerPlateCode from localStorage if it exists
        const code = localStorage.getItem(boilerPlateSelection + lastURI);
        // If it is not null, use setboilerPlateCode on cached data
        if (code !== null) {
            console.log('boilerplate retrieved from localStorage');
            setBoilerPlateCode(code);
        }
        else {
            console.log('boilerplate call to: ', boilerPlateSelection);
            // Otherwise, send call to database for boilerplate code and save to cache
            axios_1.default.post(boilerPlateSelection, { dbURI: lastURI })
                .then((res) => {
                setBoilerPlateCode(res.data);
                localStorage.setItem(boilerPlateSelection + lastURI, res.data);
            });
        }
    }, [boilerPlateSelection]);
    (0, react_1.useEffect)(() => {
        const bpSelect = document.getElementById('boiler-plate-select');
        if (bpSelect)
            bpSelect.value = 'No boilerplate code';
        setBoilerPlateCode(BoilerPlateCode_jsx_1.default);
    }, [lastURI]);
    const zoomOut = () => {
        const txt = document.getElementById('codeOutput');
        //@ts-ignore
        const style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
        const currentSize = parseFloat(style);
        //@ts-ignore
        txt.style.fontSize = (currentSize - 5) + 'px';
    };
    const zoomIn = () => {
        const txt = document.getElementById('codeOutput');
        //@ts-ignore
        const style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
        const currentSize = parseFloat(style);
        //@ts-ignore
        txt.style.fontSize = (currentSize + 5) + 'px';
    };
    return (
    // code menus and code generation
    React.createElement("div", { className: "codeDiv" },
        React.createElement("div", { id: "code-header" },
            React.createElement("section", { id: "tabs" },
                React.createElement("button", { className: currentTab === 1 ? '' : 'not-active', onClick: () => changeTab(1) }, "Schema"),
                React.createElement("button", { className: currentTab === 2 ? '' : 'not-active', onClick: () => changeTab(2) }, "Resolver"),
                React.createElement("button", { className: currentTab === 3 ? '' : 'not-active', onClick: () => changeTab(3) }, "Diagram"),
                React.createElement("button", { className: currentTab === 4 ? '' : 'not-active', onClick: () => changeTab(4) }, "Boilerplate")),
            React.createElement("form", { className: "mx-10 min-w-130" },
                React.createElement("select", { id: "boiler-plate-select", title: 'boilerplatecode', className: "form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none", "aria-label": "Default select example", 
                    // Set BoilerplateSelection equal to this selector's value to run new axios call
                    onChange: (e) => setBoilerSelection(e.target.value) },
                    React.createElement("option", { value: "No boilerplate code" }, "No boilerplate code"),
                    React.createElement("option", { value: "/defaultbp" }, "Express GraphQL"),
                    React.createElement("option", { value: "/apollobp" }, "Apollo Server"),
                    React.createElement("option", { value: "GraphQL Yoga" }, "GraphQL Yoga"),
                    React.createElement("option", { value: "GraphQL Helix" }, "GraphQL Helix"),
                    React.createElement("option", { value: "Mercurious" }, "Mercurious"))),
            React.createElement("div", { id: 'zoom-controls-container' },
                React.createElement(fa_1.FaMinusSquare, { style: { 'color': 'white' }, onClick: () => zoomOut() }),
                React.createElement(fa_1.FaPlusSquare, { style: { 'color': 'white' }, onClick: () => zoomIn() }))),
        React.createElement("div", { id: "codeOutput" }, // If current tab is === 3:
        currentTab === 3 ?
            // Render the D3 diagram element,
            React.createElement("div", { id: "diagram" }, "Diagram")
            : // Otherwise:
                // Render the Codeblock element.
                React.createElement(react_code_blocks_1.CopyBlock, { id: "copyblockid", language: 'javascript', text: currentTab === 1 ? schemaBody :
                        currentTab === 2 ? resolverBody :
                            currentTab === 4 ? boilerPlateCode :
                                `Tabs Error: tab ${currentTab} not found`, theme: react_code_blocks_1.hybrid, wrapLines: true }))));
};
exports.default = CodeBlock;
//# sourceMappingURL=codeBlock.js.map