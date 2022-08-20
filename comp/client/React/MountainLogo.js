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
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const MountainLogo = props => {
    // Mountian logo for loading screen 
    return (React.createElement("div", { id: "animate-container" },
        React.createElement("svg", { id: "mountain", viewBox: "0 0 120 89" },
            React.createElement("path", { id: "mountain-1", d: "M118.5 88.5H1.5L41 18L51 35L69.5 2L118.5 88.5Z", fill: "#145DA0", stroke: "black" })),
        React.createElement("svg", { id: "snow", viewBox: "-21 -7 120 89" },
            React.createElement("path", { id: "snow-1", d: "M1 51.5L20 18L28.5 32L10.5 62L1 51.5Z", stroke: "white", fill: "white" }),
            React.createElement("path", { id: "snow-2", d: "M48.5 2L27.5 39.5L43 51.5L57.5 39.5L76.5 51.5L48.5 2Z", stroke: "white", fill: "white" }))));
};
exports.default = MountainLogo;
//# sourceMappingURL=MountainLogo.js.map