import mongoose from "mongoose";

interface CandidateModel {
    name?: string
    age: string
    generalData?: string
    favorite?: boolean
    curriculum: string
}

const CandidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: false, readonly: true },
    generalData: { type: String, required: false, readonly: true },
    favorite: { type: Boolean, required: false, default: false },
    curriculum: { type: String, required: true, readonly: true }
});

const Candidate = mongoose.model("Candidate", CandidateSchema);

export { Candidate, CandidateModel }