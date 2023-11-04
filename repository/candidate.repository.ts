import { Candidate, CandidateModel } from "../models";

export const createCandidate = async (candidato: CandidateModel) => {
    const CandidateModel = new Candidate(candidato)
    return Candidate.create(CandidateModel)
}

export const findCandidatesByUser = async (userId: string) => {
    return Candidate.find({userId}, '-userId -sourceId')
}

export const deleteCandidate = async (id: string) => {
    return Candidate.findByIdAndDelete({_id: id})
}
