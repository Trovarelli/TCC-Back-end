import mongoose from "mongoose";

interface CandidateModel {
    nome?: string
    texto: string
    escolaridade: string[]
    idade: number
    favorito?: boolean
    userId: string
    profissao?: string
    curriculo: string
    competencias?: string[]
    caracteristicas?: string[]
    telefone?: string[]
    genero?: 'M' | 'F'
    experiencia?: string[]
    pcd?: boolean
    lgbtq?: boolean
    nivelProfissional?: 'estagiario' | 'junior' | 'pleno' | 'senior',
    email?: string
    matchField: string[]
}

const CandidateSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    idade: { type: Number, required: false, readonly: true },
    escolaridade: { type: Array<String>, required: false, readonly: true },
    texto: { type: String, required: true},
    competencias: { type: Array<String>, required: false, readonly: true },
    userId: { type: String, required: true, readonly: true },
    favorito: { type: Boolean, required: false, default: false },
    profissao: { type: String, required: false, readonly: true },
    experiencia: { type: Array<String>, required: false, readonly: true },
    caracteristicas: { type: Array<String>, required: false, readonly: true },
    curriculo: { type: String, required: true, readonly: true },
    telefone: {type: Array<String>, required: false, readonly: true},
    email: {type: String, required: false, readonly: true}, 
    genero: {type: String, required: false, readonly: true},
    pcd: {type: Boolean, required: false, readonly: true},
    lgbtq: {type: Boolean, required: false, readonly: true},
    nivelProfissional: {type: String, required: false, readonly: true},
    matchField: {type: Array<String>, required: false, readonly: true}
});

const Candidate = mongoose.model("Candidate", CandidateSchema);

export { Candidate, CandidateModel }