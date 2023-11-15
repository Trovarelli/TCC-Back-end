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
    return Candidate.find({userId}, '-userId -sourceId -curriculo')
}

export const deleteCandidate = async (userId: string, candidateId: string) => {
    return Candidate.findByIdAndDelete({_id: candidateId, userId})
}

export const findCandidatesById = async (userId: string, candidateId: string) => {
    return Candidate.findById({_id: candidateId, userId}, '-userId')
}

export const checkCandidateExistsByText = async (userId: string, text: string) => {
    return (await Candidate.find({userId, texto: text,}, '-userId')).length > 0
}

export const favoriteCandidate = async (userId: string, candidateId: string, favorite: boolean) => {
    return await Candidate.updateOne({_id: candidateId, userId}, {favorito: favorite})
}