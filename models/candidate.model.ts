import mongoose from "mongoose";

interface CandidateModel {
    nome?: string
    sourceId: string
    idade: string
    dadosGerais?: string
    favorito?: boolean
    curriculo: string,
    telefone?: string[]
}

const CandidateSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    idade: { type: Number, required: false, readonly: true },
    sourceId: { type: String, required: true},
    dadosGerais: { type: String, required: false, readonly: true },
    favorito: { type: Boolean, required: false, default: false },
    curriculo: { type: String, required: true, readonly: true },
    telefone: {type: Array<String>, required: false, readonly: true},
    email: {type: String, required: false, readonly: true}, 
});

const Candidate = mongoose.model("Candidate", CandidateSchema);

export { Candidate, CandidateModel }