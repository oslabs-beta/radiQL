"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uri = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Schema for Users that stores their username and encrypted password
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
exports.User = mongoose_1.default.model("User", userSchema);
// Schema for Uris that stores the inputted uris for each user 
const uriSchema = new mongoose_1.default.Schema({
    uri: { type: String, required: true },
    user_id: { type: mongoose_1.default.Schema.Types.ObjectId, required: true },
    uri_name: { type: String, require: true }
});
exports.Uri = mongoose_1.default.model("Uri", uriSchema);
// export default { User, Uri }; 
//# sourceMappingURL=models.js.map