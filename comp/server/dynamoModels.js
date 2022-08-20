"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uri = exports.User = void 0;
const dynamoose_1 = __importDefault(require("dynamoose"));
const nanoid_1 = require("nanoid");
const userSchema = new dynamoose_1.default.Schema({
    _id: { type: String, default: (0, nanoid_1.nanoid)(), forceDefault: true },
    username: { type: String, hashKey: true, required: true, },
    password: { type: String, required: true },
});
exports.User = dynamoose_1.default.model('User', userSchema);
const uriSchema = new dynamoose_1.default.Schema({
    _id: { type: String, hashKey: true, default: (0, nanoid_1.nanoid)(), forceDefault: true },
    uri: { type: String, required: true },
    user_id: { type: String, required: true },
    uri_name: { type: String, required: true },
});
exports.Uri = dynamoose_1.default.model('Uri', uriSchema);
//# sourceMappingURL=dynamoModels.js.map