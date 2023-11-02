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
exports.savePdfForExtract = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importStar(require("fs"));
const form_data_1 = __importDefault(require("form-data"));
const path_1 = __importDefault(require("path"));
function savePdfForExtract(fileBase64) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileBuffer = Buffer.from(fileBase64.split(",")[1], "base64");
        const saveDirectory = path_1.default.join(__dirname, "..", "common");
        const tempFilePath = path_1.default.resolve(saveDirectory, 'curriculo.pdf');
        if (!fs_1.default.existsSync(saveDirectory)) {
            fs_1.default.mkdirSync(saveDirectory);
        }
        const formData = new form_data_1.default();
        try {
            yield fs_1.promises.writeFile(tempFilePath, fileBuffer);
            formData.append("file", (0, fs_1.createReadStream)(tempFilePath), {
                filename: 'curriculo.pdf',
                contentType: 'application/pdf',
            });
            const options = {
                headers: Object.assign({ "x-api-key": process.env.CHATPDF_API_KEY }, formData.getHeaders()),
            };
            return axios_1.default
                .post("https://api.chatpdf.com/v1/sources/add-file", formData, options)
                .then((response) => {
                console.log(response.data);
                return response.data.sourceId;
            })
                .catch((error) => {
                console.log(error.message);
                throw new Error(error.message);
            });
        }
        finally {
            // Certifique-se de excluir o arquivo temporário após o uso
            // await fsPromises.unlink(tempFilePath);
        }
    });
}
exports.savePdfForExtract = savePdfForExtract;
//# sourceMappingURL=savePdfForExtract.js.map