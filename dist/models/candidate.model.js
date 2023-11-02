"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Candidate = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CandidateSchema = new mongoose_1.default.Schema({
    nome: { type: String, required: true },
    idade: { type: Number, required: false, readonly: true },
    sourceId: { type: String, required: true },
    dadosGerais: { type: String, required: false, readonly: true },
    favorito: { type: Boolean, required: false, default: false },
    curriculo: { type: String, required: true, readonly: true },
    telefone: { type: (Array), required: false, readonly: true },
    email: { type: String, required: false, readonly: true },
});
const Candidate = mongoose_1.default.model("Candidate", CandidateSchema);
exports.Candidate = Candidate;
//# sourceMappingURL=candidate.model.js.map