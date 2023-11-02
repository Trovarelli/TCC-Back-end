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
exports.askGeralQuestions = void 0;
const axios_1 = __importDefault(require("axios"));
function askGeralQuestions(sourceId) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = {
            headers: {
                "x-api-key": process.env.CHATPDF_API_KEY,
                "Content-Type": "application/json",
            },
        };
        const data = {
            sourceId,
            "messages": [
                {
                    "role": "user",
                    "content": "Esse é um curriculo de uma pessoa, quero que voce pegue o nome, email e telefone (esse campo deve ser um array) e escreva como se fosse um json"
                }
            ]
        };
        const retorno = axios_1.default
            .post("https://api.chatpdf.com/v1/chats/message", data, config)
            .then((response) => {
            var _a, _b;
            const resposta = '{' + ((_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.content) === null || _b === void 0 ? void 0 : _b.split('{').slice(1).join(''));
            console.log('RESPOSTA', JSON.parse(resposta));
            return JSON.parse(resposta);
        })
            .catch((error) => {
            throw new Error(error.message);
        });
        return retorno;
    });
}
exports.askGeralQuestions = askGeralQuestions;
//# sourceMappingURL=askGeralQuestions.js.map