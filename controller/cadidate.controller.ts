import { Request, Response } from "express";

import { createCandidate, deleteCandidate, findCandidatesByUser } from '../repository'
import { CandidateModel } from "../models";
import { askGeralQuestions, getUserIdByToken, savePdfForExtract } from "../utils";


export const getCadidateController = async (req: Request, res: Response) => {
    const userIdByToken = getUserIdByToken(req)
    const userIdFromParams = req.params.id

    if(userIdFromParams !== userIdByToken) 
        return res.status(401).json({ message: "Um usuário não pode visualzar candidatos de outro usuário." })

    try {
        const candidates = await findCandidatesByUser(userIdFromParams)

        if (candidates.length === 0) return res.status(404).json({ message: "Nenhum candidato encontrado." })
        res.status(200).json([...candidates])
    }
    catch (err) {
        res.status(401).json({ message: "Erro interno." })
    }
}

export const deleteCadidateController = async (req: Request, res: Response) => {
    const userIdByToken = getUserIdByToken(req)
    const userIdFromParams = req.params.id

    if(userIdFromParams !== userIdByToken) 
        return res.status(401).json({ message: "Um usuário não pode remover registros de outro usuário." })

    try {
        deleteCandidate(userIdFromParams)
            .then(() => res.status(200).json({ message: "Candidato removido com sucesso." }))
            .catch(() => res.status(401).json({ message: "Erro ao remover candidato." }))
    }
    catch (err) {
        res.status(401).json({ message: "Erro interno." })
    }
}

export const createCandidateController = async (req: Request, res: Response) => {
    const userIdByToken = getUserIdByToken(req)
    const userIdFromParams = req.params.id

    if(userIdFromParams !== userIdByToken) 
        return res.status(401).json({ message: "Um usuário não pode criar candidatos em nome de outro usuário." })
        
    try {
        const { curriculum } = req.body

        if(!curriculum) 
        {
            res.status(400).json({ message: "Por favor faça o upload do curriculo" })
            return
        }

        const sourceId = await savePdfForExtract(curriculum)

        const generalData: CandidateModel = await askGeralQuestions(sourceId)
       
        const candidate: CandidateModel = {
            ...generalData,
            userId: userIdFromParams,
            curriculo: curriculum,
            sourceId,
            favorito: false,
        }

        await createCandidate(candidate)
        res.status(201).json({ message: "candidato criado com sucesso!" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: `Erro no servidor: ${error}` })
    }

}
