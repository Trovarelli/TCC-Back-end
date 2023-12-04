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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const controller_1 = require("./controller");
const middleware_1 = require("./middleware");
const job_controller_1 = require("./controller/job.controller");
const cors_1 = __importDefault(require("cors"));
require('dotenv').config();
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: '50mb' }));
app.use((0, cors_1.default)({
    origin: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Connection'],
    credentials: true,
}));
app.options('*', (0, cors_1.default)());
app.get('/', (req, res) => {
    return res.send('Seja bem vinda a tahr API');
});
app.get('/candidate/:id', middleware_1.checkToken, (req, res) => {
    return (0, controller_1.getAllCadidateController)(req, res);
});
app.post('/candidate/:id', middleware_1.checkToken, (req, res) => {
    return (0, controller_1.createCandidateController)(req, res);
});
app.post('/candidate/:id/:candidatoId', middleware_1.checkToken, (req, res) => {
    return (0, controller_1.deleteCadidateController)(req, res);
});
app.get('/candidate/curriculum/:id/:candidatoId', middleware_1.checkToken, (req, res) => {
    return (0, controller_1.getCandidateCurriculumController)(req, res);
});
app.post('/candidate/favorite/:id/:candidatoId', middleware_1.checkToken, (req, res) => {
    return (0, controller_1.favoriteCandidateController)(req, res);
});
app.get('/job/:id', middleware_1.checkToken, (req, res) => {
    return (0, job_controller_1.getAllJobController)(req, res);
});
app.post('/job/:id', middleware_1.checkToken, (req, res) => {
    return (0, job_controller_1.createJobController)(req, res);
});
app.post('/job/:id/:jobId', middleware_1.checkToken, (req, res) => {
    return (0, job_controller_1.deleteJobController)(req, res);
});
app.post('/user/:id', middleware_1.checkToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, controller_1.updateUserController)(req, res);
}));
app.post('/auth/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, controller_1.createUserController)(req, res);
}));
app.post('/auth/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, controller_1.loginController)(req, res);
}));
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dbName = process.env.DB_NAME;
mongoose_1.default.set('strictQuery', false);
mongoose_1.default.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.xn3pg3y.mongodb.net/${dbName}?retryWrites=true&w=majority`).then(() => {
    app.listen(3001);
    console.log("Conexão realizada");
}).catch((err) => console.log(err));
//# sourceMappingURL=index.js.map