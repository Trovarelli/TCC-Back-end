import { Request, Response } from "express";

import { createCandidate, findCandidates } from '../repository'
import { CandidateModel } from "../models";
import { askGeralQuestions, savePdfForExtract } from "../utils";


export const getCadidateController = async (res: Response) => {
    try {
        const user = await findCandidates()

        if (!user) return res.status(404).json({ message: "Candidato não encontrado" })
        res.status(200).json({ user })
    }
    catch (err) {
        res.status(401).json({ message: "inválido" })
    }
}

export const createCandidateController = async (req: Request, res: Response) => {
    try {
        const { curriculum } = req.body
        if(!curriculum) 
        {
            res.status(400).json({ message: "por favor faça o upload do curriculo" })
            return
        }

        const sourceId = await savePdfForExtract(curriculum)

        const generalData: Object = await askGeralQuestions(sourceId)
       
        const candidate: CandidateModel = {
            idade: '20',
            curriculo: curriculum,
            sourceId,
            favorito: false,
            dadosGerais: '',
            ...generalData
        }

        await createCandidate(candidate)
        res.status(201).json({ message: "candidato criado com sucesso!" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: `Erro no servidor: ${error}` })
    }

}
