import { Request, Response } from "express";
import { checkCandidateExistsByText, createCandidate, deleteCandidate, favoriteCandidate, findCandidatesById, findCandidatesByUser } from '../repository'
import { CandidateModel } from "../models";
import { askGeralQuestions, getUserIdByToken, savePdfForExtract } from "../utils";

export const getAllCadidateController = async (req: Request, res: Response) => {
    const userIdByToken = getUserIdByToken(req)
    const userIdFromParams = req.params.id
   
    if(userIdFromParams !== userIdByToken) 
        return res.status(401).json({ message: "Um usuário não pode visualzar candidatos de outro usuário." })

    try {
        const candidates = await findCandidatesByUser(userIdFromParams)

        if (candidates.length === 0) return res.status(404).json({ message: "Nenhum candidato encontrado." })
        res.status(200).json(candidates)
    }
    catch (err) {
        res.status(401).json({ message: "Erro interno." })
    }
}

export const deleteCadidateController = async (req: Request, res: Response) => {
    const userIdByToken = getUserIdByToken(req)
    const userIdFromParams = req.params.id
    const candidateId = req.params.candidatoId

    if(userIdFromParams !== userIdByToken) 
        return res.status(401).json({ message: "Um usuário não pode remover registros de outro usuário." })

    try {
        deleteCandidate(userIdFromParams, candidateId)
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

        const dataText = await savePdfForExtract(curriculum)

        const candidateExists = await checkCandidateExistsByText(userIdFromParams, dataText)

        if(candidateExists) return res.status(409).json({ message: "Esse curriculo ja está cadastrado na sua base de dados" })

        const generalData: CandidateModel = await askGeralQuestions(dataText)
       
        const candidate: CandidateModel = {
            ...generalData,
            userId: userIdFromParams,
            curriculo: curriculum,
            texto: dataText,
            favorito: false,
        }

        const filterField = []
        for (const key in candidate) {
            if (candidate.hasOwnProperty(key) && key !== 'userId' && key !== 'curriculo' && key !== 'texto') {
                const element = candidate[key as keyof typeof candidate];
                if (element && Array.isArray(element)) {
                    element.forEach((e) => filterField.push(`${key}:${e.trim()
                        .replace(/[^\w\s]/gi, "")
                        .toLowerCase()}`))
                }
                if(element) {
                    filterField.push(`${key}:${String(element)?.trim()
                        .replace(/[^\w\s]/gi, "")
                        .toLowerCase()}`)
                }
            }
        }
            

        await createCandidate(candidate)
        res.status(200).json({ ...candidate})
    } catch (error) {
        res.status(500).json({ message: `Erro no servidor: ${error}` })
    }

}

export const getCandidateCurriculumController = async (req: Request, res: Response) => {
    const userIdByToken = getUserIdByToken(req)
    const userIdFromParams = req.params.id
    const candidateId = req.params.candidatoId

    if(userIdFromParams !== userIdByToken) 
        return res.status(401).json({ message: "Um usuário não pode visualzar candidatos de outro usuário." })

    try {
        const candidates = await findCandidatesById(userIdFromParams, candidateId)

        if (!candidates) return res.status(404).json({ message: "Nenhum candidato encontrado." })
        res.status(200).json({ curriculo: candidates.curriculo })
    }
    catch (err) {
        res.status(401).json({ message: "Erro interno." })
    }
}

export const favoriteCandidateController = async (req: Request, res: Response) => {
    const userIdByToken = getUserIdByToken(req)
    const userIdFromParams = req.params.id
    const candidateId = req.params.candidatoId

    if(userIdFromParams !== userIdByToken) 
        return res.status(401).json({ message: "Um usuário não pode alterar os dados de candidatos de outro usuário." })

        try {
            const candidates = await favoriteCandidate(userIdFromParams, candidateId, req.body?.favorito || true)
    
            if (!candidates) return res.status(404).json({ message: "Nenhum candidato encontrado." })
            res.status(200).json({ message: "Candidato favoritado com sucesso." })
        }
        catch (err) {
            res.status(401).json({ message: "Erro interno." })
        }
}
