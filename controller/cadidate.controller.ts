import { Request, Response } from "express";

import { createCandidate, findCandidates } from '../repository'
import { CandidateModel } from "../models";

export const getCadidateController = async (res: Response) => {
    try {
        const user = await findCandidates()

        if (!user) return res.status(404).json({ message: "Candidato não encontrado" })
        res.status(200).json({ user })
    }
    catch (err) {
        res.status(400).json({ message: "inválido" })
    }
}

export const createCandidateController = async (req: Request, res: Response) => {
    const { curriculum } = req.body

    const candidate: CandidateModel = {
        age: '22',
        curriculum,
        favorite: false,
        generalData: 'ASDJUIOIFBQEUJIPGFRBHQIP  	OURGBQEIPU´JGFHJÁOIFJÓIjf [p    jo´~aNS´FJKOsdnfo´jkSNDFO´JNSdfoj´h n',
        name: 'CIDO'
    }
    
    try {
        await createCandidate(candidate)
        res.status(201).json({ message: "candidato criado com sucesso!" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: `Erro no servidor: ${error}` })
    }

}
