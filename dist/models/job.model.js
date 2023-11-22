"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const JobSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    company: { type: String, required: true },
    description: { type: String, required: true },
    skills: { type: (Array), required: true },
    benefits: { type: (Array), required: true },
    salary: { type: Number, required: false },
});
const Job = mongoose_1.default.model("Job", JobSchema);
exports.Job = Job;
//# sourceMappingURL=job.model.js.map