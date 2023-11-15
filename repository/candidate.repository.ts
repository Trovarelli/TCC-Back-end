import { Candidate, CandidateModel } from "../models";

export const createCandidate = async (candidato: CandidateModel) => {
    const CandidateModel = new Candidate(candidato)
    return Candidate.create(CandidateModel)
}

export const findCandidatesByUser = async (userId: string, parametros?: {
    genero: 'M' | 'F' | 'O',
    nome: string,
    idade: number,
    escolaridade: string,
    experiencia: string,
}) => {
    return Candidate.find({userId}, '-userId -sourceId')
}

export const deleteCandidate = async (userId: string, candidateId: string) => {
    return Candidate.findByIdAndDelete({_id: candidateId, userId})
}

export const findCandidatesById = async (userId: string, candidateId: string) => {
    return Candidate.findById({_id: candidateId, userId}, '-userId')
}
