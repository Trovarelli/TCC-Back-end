import { Candidate, CandidateModel } from "../models";

export const createCandidate = async (candidato: CandidateModel) => {
    const { name, age, generalData, favorite, curriculum } = candidato
    const CandidateModel = new Candidate({
        name, age, generalData, favorite, curriculum
    })
    return Candidate.create(CandidateModel)
}

export const findCandidates = async () => {
    return Candidate.find()
}
