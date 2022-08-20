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
const SavedDatabases = ({ savedUris, GetUsersUris, username, setSelectedDatabase }) => {
    // Call GetUsersUris whenever the username changes
    React.useEffect(() => {
        GetUsersUris();
    }, [username]);
    return (React.createElement("div", { id: 'saved-db-container' },
        React.createElement("select", { name: 'savedDatabases', id: 'savedDatabases', onChange: (e) => setSelectedDatabase(e.target.value) },
            React.createElement("option", { selected: true, disabled: true }, "Saved Databases"),
            Array.isArray(savedUris) && savedUris.map((uri) => (React.createElement("option", { value: uri.uri_name }, uri.uri_name))))));
};
exports.default = SavedDatabases;
//# sourceMappingURL=SavedDatabases.js.map