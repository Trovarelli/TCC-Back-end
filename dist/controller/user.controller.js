"use strict";
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
exports.getUserById = exports.loginController = exports.createUserController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const repository_1 = require("../repository");
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, confirmPassword, company } = req.body;
    if (!name)
        return res.status(422).json({ message: "O nome é obrigatório" });
    if (!email)
        return res.status(422).json({ message: "O e-mail é obrigatório" });
    if (!password)
        return res.status(422).json({ message: "A senha é obrigatória" });
    if (!company)
        return res.status(422).json({ message: "A empresa é obrigatória" });
    if (password !== confirmPassword)
        return res.status(422).json({ message: "As senhas devem ser iguais" });
    const userExists = yield (0, repository_1.findUserByEmail)(email);
    if (userExists)
        return res.status(422).json({ message: "Este e-mail ja está cadastrado" });
    const salt = yield bcrypt_1.default.genSalt(12);
    const passwordHash = yield bcrypt_1.default.hash(password, salt);
    const user = {
        name, email, password: passwordHash, company
    };
    try {
        yield (0, repository_1.createUser)(user);
        res.status(201).json({ message: "Usuário criado com sucesso!" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Erro no servidor: ${error}` });
    }
});
exports.createUserController = createUserController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email)
        return res.status(422).json({ message: "O e-mail é obrigatório" });
    if (!password)
        return res.status(422).json({ message: "A senha é obrigatória" });
    const user = yield (0, repository_1.findUserByEmail)(email);
    if (!user)
        return res.status(404).json({ message: "Usuário não cadastrado" });
    const checkPassword = yield bcrypt_1.default.compare(password, user.password);
    if (!checkPassword)
        return res.status(422).json({ message: "Senha inválida" });
    try {
        const secret = process.env.SECRET;
        const token = jsonwebtoken_1.default.sign({
            id: user._id
        }, secret, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.status(200).json({ message: "Autenticação realizada com sucesso", token });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: `Erro no servidor: ${err}` });
    }
});
exports.loginController = loginController;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield (0, repository_1.findUserById)(id, '-password -_id');
        if (!user)
            return res.status(404).json({ message: "Usuário não encontrado" });
        res.status(200).json({ user });
    }
    catch (err) {
        res.status(400).json({ message: "Id inválido" });
    }
});
exports.getUserById = getUserById;
