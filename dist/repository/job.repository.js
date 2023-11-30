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
exports.controllStatusJob = exports.checkJobExistsByText = exports.findJobsById = exports.deleteJob = exports.findJobsByUser = exports.createJob = void 0;
const models_1 = require("../models");
const createJob = (candidato) => __awaiter(void 0, void 0, void 0, function* () {
    return models_1.Job.create(candidato).then((data) => data._id);
});
exports.createJob = createJob;
const findJobsByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Job.find({ userId }, '-userId -sourceId -curriculo').lean();
});
exports.findJobsByUser = findJobsByUser;
const deleteJob = (userId, JobId) => __awaiter(void 0, void 0, void 0, function* () {
    return models_1.Job.findByIdAndDelete({ _id: JobId, userId });
});
exports.deleteJob = deleteJob;
const findJobsById = (userId, JobId) => __awaiter(void 0, void 0, void 0, function* () {
    return models_1.Job.findById({ _id: JobId, userId }, '-userId');
});
exports.findJobsById = findJobsById;
const checkJobExistsByText = (userId, text) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield models_1.Job.find({ userId, texto: text, }, '-userId')).length > 0;
});
exports.checkJobExistsByText = checkJobExistsByText;
const controllStatusJob = (userId, JobId, controlledStatus) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Job.updateOne({ _id: JobId, userId }, { favorito: controlledStatus });
});
exports.controllStatusJob = controllStatusJob;
//# sourceMappingURL=job.repository.js.map