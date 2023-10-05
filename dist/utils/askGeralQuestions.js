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
Object.defineProperty(exports, "__esModule", { value: true });
exports.askGeralQuestions = void 0;
const axios = require("axios");
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
                    "content": "How much is the world?"
                }
            ]
        };
        const retorno = axios
            .post("https://api.chatpdf.com/v1/chats/message", data, config)
            .then((response) => {
            console.log("Result:", response.data.content);
            return response.data.content;
        })
            .catch((error) => {
            console.log(error.response.data);
            throw new Error(error.message);
        });
        return retorno;
    });
}
exports.askGeralQuestions = askGeralQuestions;
