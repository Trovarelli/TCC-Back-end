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
exports.savePdfForExtract = void 0;
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const path = require("path");
function savePdfForExtract(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const binaryData = Buffer.from(file, "base64");
        const saveDirectory = path.join(__dirname, "..", "common");
        const filePath = path.resolve(saveDirectory, 'curriculo.pdf');
        if (!fs.existsSync(saveDirectory)) {
            fs.mkdirSync(saveDirectory);
        }
        fs.writeFileSync(filePath, binaryData);
        const formData = new FormData();
        formData.append("file", fs.createReadStream(filePath));
        const options = {
            headers: {
                "x-api-key": process.env.CHATPDF_API_KEY,
            },
        };
        return axios
            .post("https://api.chatpdf.com/v1/sources/add-file", formData, options)
            .then((response) => {
            console.log(response.data);
            return response.data.sourceId;
        })
            .catch((error) => {
            console.log(error.message);
            throw new Error(error.message);
        });
    });
}
exports.savePdfForExtract = savePdfForExtract;
