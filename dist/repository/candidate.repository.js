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
exports.deleteCandidate = exports.findCandidatesByUser = exports.createCandidate = void 0;
const models_1 = require("../models");
const createCandidate = (candidato) => __awaiter(void 0, void 0, void 0, function* () {
    const CandidateModel = new models_1.Candidate(candidato);
    return models_1.Candidate.create(CandidateModel);
});
exports.createCandidate = createCandidate;
const findCandidatesByUser = (userId, parametros) => __awaiter(void 0, void 0, void 0, function* () {
    return models_1.Candidate.find({ userId }, '-userId -sourceId');
});
exports.findCandidatesByUser = findCandidatesByUser;
const deleteCandidate = (userId, candidateId) => __awaiter(void 0, void 0, void 0, function* () {
    return models_1.Candidate.findByIdAndDelete({ _id: candidateId, userId });
});
exports.deleteCandidate = deleteCandidate;
//# sourceMappingURL=candidate.repository.js.map