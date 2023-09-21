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
exports.findCandidates = exports.createCandidate = void 0;
const models_1 = require("../models");
const createCandidate = (candidato) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, age, generalData, favorite, curriculum } = candidato;
    const CandidateModel = new models_1.Candidate({
        name, age, generalData, favorite, curriculum
    });
    return models_1.Candidate.create(CandidateModel);
});
exports.createCandidate = createCandidate;
const findCandidates = () => __awaiter(void 0, void 0, void 0, function* () {
    return models_1.Candidate.find();
});
exports.findCandidates = findCandidates;
