import mongoose from "mongoose";

interface CandidateModel {
    user: string
    name?: string
    age: string
    generalData?: string
    favorite?: boolean
    curriculum: Buffer
}

const CandidateSchema = new mongoose.Schema({
    user: { type: String, required: true },
    name: { type: String, required: false },
    age: { type: Number, required: false, readonly: true },
    generalData: { type: String, required: false, readonly: true },
    favorite: { type: Boolean, required: false, default: false },
    curriculum: { type: Buffer, required: true, readonly: true }
});

const Candidate = mongoose.model("Candidate", CandidateSchema);

export { Candidate, CandidateModel }