"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && String(authHeader).split(" ")[1];
    if (!token)
        return res.status(401).json({ message: 'Acesso negado' });
    try {
        const secret = process.env.SECRET;
        jsonwebtoken_1.default.verify(token, secret);
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: "Token inválido" });
    }
};
exports.checkToken = checkToken;
//# sourceMappingURL=checkToken.js.map