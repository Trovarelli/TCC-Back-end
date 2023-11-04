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
exports.createCandidateController = exports.deleteCadidateController = exports.getCadidateController = void 0;
const repository_1 = require("../repository");
const utils_1 = require("../utils");
const getCadidateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userIdByToken = (0, utils_1.getUserIdByToken)(req);
    const userIdFromParams = req.params.id;
    if (userIdFromParams !== userIdByToken)
        return res.status(401).json({ message: "Um usuário não pode visualzar candidatos de outro usuário." });
    try {
        const candidates = yield (0, repository_1.findCandidatesByUser)(userIdFromParams);
        if (candidates.length === 0)
            return res.status(404).json({ message: "Nenhum candidato encontrado." });
        res.status(200).json([...candidates]);
    }
    catch (err) {
        res.status(401).json({ message: "Erro interno." });
    }
});
exports.getCadidateController = getCadidateController;
const deleteCadidateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userIdByToken = (0, utils_1.getUserIdByToken)(req);
    const userIdFromParams = req.params.id;
    if (userIdFromParams !== userIdByToken)
        return res.status(401).json({ message: "Um usuário não pode remover registros de outro usuário." });
    try {
        (0, repository_1.deleteCandidate)(userIdFromParams)
            .then(() => res.status(200).json({ message: "Candidato removido com sucesso." }))
            .catch(() => res.status(401).json({ message: "Erro ao remover candidato." }));
    }
    catch (err) {
        res.status(401).json({ message: "Erro interno." });
    }
});
exports.deleteCadidateController = deleteCadidateController;
const createCandidateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userIdByToken = (0, utils_1.getUserIdByToken)(req);
    const userIdFromParams = req.params.id;
    if (userIdFromParams !== userIdByToken)
        return res.status(401).json({ message: "Um usuário não pode criar candidatos em nome de outro usuário." });
    try {
        const { curriculum } = req.body;
        if (!curriculum) {
            res.status(400).json({ message: "Por favor faça o upload do curriculo" });
            return;
        }
        const sourceId = yield (0, utils_1.savePdfForExtract)(curriculum);
        const generalData = yield (0, utils_1.askGeralQuestions)(sourceId);
        const candidate = Object.assign(Object.assign({}, generalData), { userId: userIdFromParams, curriculo: curriculum, sourceId, favorito: false });
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