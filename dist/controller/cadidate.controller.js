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
exports.createCandidateController = exports.getCadidateController = void 0;
const repository_1 = require("../repository");
const utils_1 = require("../utils");
const getCadidateController = (res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, repository_1.findCandidates)();
        if (!user)
            return res.status(404).json({ message: "Candidato não encontrado" });
        res.status(200).json({ user });
    }
    catch (err) {
        res.status(401).json({ message: "inválido" });
    }
});
exports.getCadidateController = getCadidateController;
const createCandidateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { curriculum } = req.body;
        if (!curriculum) {
            res.status(400).json({ message: "por favor faça o upload do curriculo" });
            return;
        }
        const sourceId = yield (0, utils_1.savePdfForExtract)(curriculum);
        const generalData = yield (0, utils_1.askGeralQuestions)(sourceId);
        const candidate = Object.assign({ idade: '20', curriculo: curriculum, sourceId, favorito: false }, generalData);
        yield (0, repository_1.createCandidate)(candidate);
        res.status(201).json({ message: "candidato criado com sucesso!" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Erro no servidor: ${error}` });
    }
});
exports.createCandidateController = createCandidateController;
//# sourceMappingURL=cadidate.controller.js.map