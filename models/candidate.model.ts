import mongoose from "mongoose";

interface CandidateModel {
    nome?: string
    sourceId: string
    idade: number
    favorito?: boolean
    userId: string
    curriculo: string
    competencias?: string[]
    telefone?: string[]
    genero?: 'M' | 'F'
    experiencia?: string[]
    pcd?: boolean
    lgbtq?: boolean
    nivelProfissional?: 'estagiario' | 'junior' | 'pleno' | 'senior',
    email?: string
}

const CandidateSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    idade: { type: Number, required: false, readonly: true },
    sourceId: { type: String, required: true},
    competencias: { type: Array<String>, required: false, readonly: true },
    userId: { type: String, required: true, readonly: true },
    favorito: { type: Boolean, required: false, default: false },
    experiencia: { type: Array<String>, required: false, readonly: true },
    curriculo: { type: String, required: true, readonly: true },
    telefone: {type: Array<String>, required: false, readonly: true},
    email: {type: String, required: false, readonly: true}, 
    genero: {type: String, required: false, readonly: true},
    pcd: {type: Boolean, required: false, readonly: true},
    lgbtq: {type: Boolean, required: false, readonly: true},
    nivelProfissional: {type: String, required: false, readonly: true}
});

const Candidate = mongoose.model("Candidate", CandidateSchema);

export { Candidate, CandidateModel }