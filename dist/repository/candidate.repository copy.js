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
exports.favoriteCandidate = exports.checkCandidateExistsByText = exports.findCandidatesById = exports.deleteCandidate = exports.findCandidatesByUser = exports.createCandidate = void 0;
const models_1 = require("../models");
const createCandidate = (candidato) => __awaiter(void 0, void 0, void 0, function* () {
    return models_1.Candidate.create(candidato).then((data) => data._id);
});
exports.createCandidate = createCandidate;
const findCandidatesByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Candidate.find({ userId }, '-userId -sourceId -curriculo').lean();
});
exports.findCandidatesByUser = findCandidatesByUser;
const deleteCandidate = (userId, candidateId) => __awaiter(void 0, void 0, void 0, function* () {
    return models_1.Candidate.findByIdAndDelete({ _id: candidateId, userId });
});
exports.deleteCandidate = deleteCandidate;
const findCandidatesById = (userId, candidateId) => __awaiter(void 0, void 0, void 0, function* () {
    return models_1.Candidate.findById({ _id: candidateId, userId }, '-userId');
});
exports.findCandidatesById = findCandidatesById;
const checkCandidateExistsByText = (userId, text) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield models_1.Candidate.find({ userId, texto: text, }, '-userId')).length > 0;
});
exports.checkCandidateExistsByText = checkCandidateExistsByText;
const favoriteCandidate = (userId, candidateId, favorite) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Candidate.updateOne({ _id: candidateId, userId }, { favorito: favorite });
});
exports.favoriteCandidate = favoriteCandidate;
//# sourceMappingURL=candidate.repository%20copy.js.map