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
exports.createJobController = exports.updateJobController = exports.deleteJobController = exports.getAllJobController = void 0;
const job_repository_1 = require("../repository/job.repository");
const utils_1 = require("../utils");
const makeMatchField_1 = require("../utils/makeMatchField");
const getAllJobController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userIdByToken = (0, utils_1.getUserIdByToken)(req);
    const userIdFromParams = req.params.id;
    if (userIdFromParams !== userIdByToken)
        return res.status(401).json({ message: "Um usuário não pode visualzar vagas de outro usuário." });
    try {
        const jobs = yield (0, job_repository_1.findJobsByUser)(userIdFromParams);
        res.status(200).json(jobs);
    }
    catch (err) {
        res.status(401).json({ message: "Erro interno." });
    }
});
exports.getAllJobController = getAllJobController;
const deleteJobController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userIdByToken = (0, utils_1.getUserIdByToken)(req);
    const userIdFromParams = req.params.id;
    const jobId = req.params.jobId;
    if (userIdFromParams !== userIdByToken)
        return res.status(401).json({ message: "Um usuário não pode remover registros de outro usuário." });
    try {
        (0, job_repository_1.deleteJob)(userIdFromParams, jobId)
            .then(() => res.status(200).json({ message: "Vaga removida com sucesso." }))
            .catch(() => res.status(401).json({ message: "Erro ao remover vaga." }));
    }
    catch (err) {
        res.status(401).json({ message: "Erro interno." });
    }
});
exports.deleteJobController = deleteJobController;
const updateJobController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userIdByToken = (0, utils_1.getUserIdByToken)(req);
    const userIdFromParams = req.params.id;
    const jobId = req.params.jobId;
    const { descricao, titulo, caracteristicas } = req.body;
    if (!jobId)
        return res.status(400).json({ message: "Por favor informe qual a vaga que deseja atualizar" });
    if (userIdFromParams !== userIdByToken)
        return res.status(401).json({ message: "Um usuário não pode alterar os dados de vagas de outro usuário." });
    try {
        yield (0, job_repository_1.updateJob)(userIdFromParams, jobId, { caracteristicas, descricao, titulo });
        const newJob = yield (0, job_repository_1.findJobsById)(userIdByToken, jobId);
        if (newJob) {
            const jobWithMatchField = (0, makeMatchField_1.createJobMatchField)({ empresa: newJob === null || newJob === void 0 ? void 0 : newJob.empresa, descricao, caracteristicas, userId: userIdByToken, ativo: false, titulo, matchField: [] });
            return res.status(200).json({ message: "Vaga atualizada com sucesso.", job: jobWithMatchField });
        }
        else
            return res.status(500).json({ message: "Erro ao atualizar vaga" });
    }
    catch (err) {
        res.status(401).json({ message: "Erro interno." });
    }
});
exports.updateJobController = updateJobController;
const createJobController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userIdByToken = (0, utils_1.getUserIdByToken)(req);
    const userIdFromParams = req.params.id;
    if (userIdFromParams !== userIdByToken)
        return res.status(401).json({ message: "Um usuário não pode criar vagas em nome de outro usuário." });
    try {
        const { empresa, descricao, caracteristicas, titulo } = req.body;
        if (!titulo) {
            res.status(400).json({ message: "Por favor preencha o campo titulo" });
            return;
        }
        if (!empresa) {
            res.status(400).json({ message: "Por favor preencha o campo empresa" });
            return;
        }
        if (!descricao) {
            res.status(400).json({ message: "Por favor preencha o campo descricao" });
            return;
        }
        if (!caracteristicas) {
            res.status(400).json({ message: "Por favor preencha o campo caracteristicas" });
            return;
        }
        const job = (0, makeMatchField_1.createJobMatchField)({ empresa, descricao, caracteristicas, userId: userIdByToken, ativo: false, titulo, matchField: [] });
        const id = yield (0, job_repository_1.createJob)(job);
        const jobToReturn = Object.assign(Object.assign({}, job), { _id: id });
        res.status(200).json(Object.assign({}, jobToReturn));
    }
    catch (error) {
        res.status(500).json({ message: `Erro no servidor: ${error}` });
    }
});
exports.createJobController = createJobController;
//# sourceMappingURL=job.controller.js.map