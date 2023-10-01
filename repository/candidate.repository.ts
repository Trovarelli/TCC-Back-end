import { Candidate, CandidateModel } from "../models";

export const createCandidate = async (candidato: CandidateModel) => {
    const { name, age, generalData, favorite, curriculum, sourceId } = candidato
    const CandidateModel = new Candidate({
        name, age, generalData, favorite, curriculum, sourceId
    })
    return Candidate.create(CandidateModel)
}

export const findCandidates = async () => {
    return Candidate.find()
}
