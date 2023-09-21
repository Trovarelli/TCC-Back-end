"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Candidate = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CandidateSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: false, readonly: true },
    generalData: { type: String, required: false, readonly: true },
    favorite: { type: Boolean, required: false, default: false },
    curriculum: { type: String, required: true, readonly: true }
});
const Candidate = mongoose_1.default.model("Candidate", CandidateSchema);
exports.Candidate = Candidate;
