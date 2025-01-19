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
exports.favoriteCandidateController = exports.getCandidateCurriculumController = exports.createCandidateController = exports.deleteCadidateController = exports.getAllCadidateController = void 0;
const repository_1 = require("../repository");
const utils_1 = require("../utils");
const makeMatchField_1 = require("../utils/makeMatchField");
const getAllCadidateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userIdByToken = (0, utils_1.getUserIdByToken)(req);
    const userIdFromParams = req.params.id;
    if (userIdFromParams !== userIdByToken)
        return res.status(401).json({ message: "Um usuário não pode visualzar candidatos de outro usuário." });
    try {
        const candidates = yield (0, repository_1.findCandidatesByUser)(userIdFromParams);
        res.status(200).json(candidates);
    }
    catch (err) {
        res.status(401).json({ message: "Erro interno." });
    }
});
exports.getAllCadidateController = getAllCadidateController;
const deleteCadidateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userIdByToken = (0, utils_1.getUserIdByToken)(req);
    const userIdFromParams = req.params.id;
    const candidateId = req.params.candidatoId;
    if (userIdFromParams !== userIdByToken)
        return res.status(401).json({ message: "Um usuário não pode remover registros de outro usuário." });
    try {
        (0, repository_1.deleteCandidate)(userIdFromParams, candidateId)
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
    const apiKey = req.headers['apiKey'];
    if (userIdFromParams !== userIdByToken)
        return res.status(401).json({ message: "Um usuário não pode criar candidatos em nome de outro usuário." });
    try {
        const { curriculum } = req.body;
        if (!curriculum) {
            res.status(400).json({ message: "Por favor faça o upload do curriculo" });
            return;
        }
        const dataText = yield (0, utils_1.savePdfForExtract)(curriculum);
        const candidateExists = yield (0, repository_1.checkCandidateExistsByText)(userIdFromParams, dataText);
        if (candidateExists)
            return res.status(409).json({ message: "Esse curriculo ja está cadastrado na sua base de dados" });
        const generalData = yield (0, utils_1.askGeralQuestions)(dataText, String(apiKey));
        const candidate = (0, makeMatchField_1.createCandidatoMatchField)(Object.assign(Object.assign({}, generalData), { userId: userIdFromParams, curriculo: curriculum, texto: dataText, favorito: false }));
        const id = yield (0, repository_1.createCandidate)(candidate);
        const candidateToReturn = Object.assign(Object.assign({}, candidate), { _id: id });
        res.status(200).json(Object.assign({}, candidateToReturn));
    }
    catch (error) {
        res.status(500).json({ message: `Erro no servidor: ${error}` });
    }
});
exports.createCandidateController = createCandidateController;
const getCandidateCurriculumController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userIdByToken = (0, utils_1.getUserIdByToken)(req);
    const userIdFromParams = req.params.id;
    const candidateId = req.params.candidatoId;
    if (userIdFromParams !== userIdByToken)
        return res.status(401).json({ message: "Um usuário não pode visualzar candidatos de outro usuário." });
    try {
        const candidates = yield (0, repository_1.findCandidatesById)(userIdFromParams, candidateId);
        if (!candidates)
            return res.status(404).json({ message: "Nenhum candidato encontrado." });
        res.status(200).json({ curriculo: candidates.curriculo });
    }
    catch (err) {
        res.status(401).json({ message: "Erro interno." });
    }
});
exports.getCandidateCurriculumController = getCandidateCurriculumController;
const favoriteCandidateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userIdByToken = (0, utils_1.getUserIdByToken)(req);
    const userIdFromParams = req.params.id;
    const candidateId = req.params.candidatoId;
    if (userIdFromParams !== userIdByToken)
        return res.status(401).json({ message: "Um usuário não pode alterar os dados de candidatos de outro usuário." });
    try {
        const candidates = yield (0, repository_1.favoriteCandidate)(userIdFromParams, candidateId, ((_a = req.body) === null || _a === void 0 ? void 0 : _a.favorito) || true);
        if (!candidates)
            return res.status(404).json({ message: "Nenhum candidato encontrado." });
        res.status(200).json({ message: "Candidato favoritado com sucesso." });
    }
    catch (err) {
        res.status(401).json({ message: "Erro interno." });
    }
});
exports.favoriteCandidateController = favoriteCandidateController;
//# sourceMappingURL=cadidate.controller.js.map