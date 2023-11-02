import { Candidate, CandidateModel } from "../models";

export const createCandidate = async (candidato: CandidateModel) => {
    const CandidateModel = new Candidate(candidato)
    return Candidate.create(CandidateModel)
}

export const findCandidates = async () => {
    return Candidate.find()
}
