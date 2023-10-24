"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIdByToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUserIdByToken = (req) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1] || '';
    const secret = process.env.SECRET;
    const decoded = jsonwebtoken_1.default.verify(token, secret);
    return decoded === null || decoded === void 0 ? void 0 : decoded.key;
};
exports.getUserIdByToken = getUserIdByToken;
