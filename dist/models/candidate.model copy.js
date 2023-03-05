"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Candidate = exports.CandidateSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.CandidateSchema = new mongoose_1.default.Schema({
    name: { type: String, required: false },
    age: { type: Number, required: false },
    generalData: { type: String, required: false },
    curriculum: { type: Buffer, required: true }
});
exports.Candidate = mongoose_1.default.model("Candidate", exports.CandidateSchema);
