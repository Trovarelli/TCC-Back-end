"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const JobSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    empresa: { type: String, required: true },
    descricao: { type: String, required: true },
    titulo: { type: String, required: true },
    caracteristicas: { type: (Array), required: true },
    ativo: { type: Boolean, required: true, default: true },
    matchField: { type: (Array), required: false, readonly: true }
});
const Job = mongoose_1.default.model("Job", JobSchema);
exports.Job = Job;
//# sourceMappingURL=job.model.js.map