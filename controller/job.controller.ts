import { Request, Response } from "express";
import { controllStatusJob, createJob, deleteJob, findJobsByUser } from "../repository/job.repository"
import { getUserIdByToken } from "../utils"
import { JobModel } from "../models";
import { createJobMatchField } from "../utils/makeMatchField";

export const getAllJobController = async (req: Request, res: Response) => {
    const userIdByToken = getUserIdByToken(req)
    const userIdFromParams = req.params.id
   
    if(userIdFromParams !== userIdByToken) 
        return res.status(401).json({ message: "Um usuário não pode visualzar vagas de outro usuário." })

    try {
        const jobs = await findJobsByUser(userIdFromParams)

        if (jobs.length === 0) return res.status(404).json({ message: "Nenhuma vaga encontrada." })

        res.status(200).json(jobs)
    }
    catch (err) {
        res.status(401).json({ message: "Erro interno." })
    }
}

export const deleteJobController = async (req: Request, res: Response) => {
    const userIdByToken = getUserIdByToken(req)
    const userIdFromParams = req.params.id
    const jobId = req.params.jobId

    if(userIdFromParams !== userIdByToken) 
        return res.status(401).json({ message: "Um usuário não pode remover registros de outro usuário." })

    try {
        deleteJob(userIdFromParams, jobId)
            .then(() => res.status(200).json({ message: "Vaga removida com sucesso." }))
            .catch(() => res.status(401).json({ message: "Erro ao remover vaga." }))
    }
    catch (err) {
        res.status(401).json({ message: "Erro interno." })
    }
}

export const controllStatusJobController = async (req: Request, res: Response) => {
    const userIdByToken = getUserIdByToken(req)
    const userIdFromParams = req.params.id
    const candidateId = req.params.candidatoId

    if(userIdFromParams !== userIdByToken) 
        return res.status(401).json({ message: "Um usuário não pode alterar os dados de vagas de outro usuário." })

        try {
            const vagas = await controllStatusJob(userIdFromParams, candidateId, req.body?.favorito || true)
    
            if (!vagas) return res.status(404).json({ message: "Nenhuma vaga encontrada." })
            res.status(200).json({ message: "Vaga atualizada com sucesso." })
        }
        catch (err) {
            res.status(401).json({ message: "Erro interno." })
        }
}

export const createJobController = async (req: Request, res: Response) => {
    const userIdByToken = getUserIdByToken(req)
    const userIdFromParams = req.params.id

    if(userIdFromParams !== userIdByToken) 
        return res.status(401).json({ message: "Um usuário não pode criar vagas em nome de outro usuário." })
        
    try {

        const { empresa, descricao, caracteristicas, titulo } = req.body

        if(!titulo) {
            res.status(400).json({ message: "Por favor preencha o campo titulo" })
            return
        }
        if(!empresa) {
            res.status(400).json({ message: "Por favor preencha o campo empresa" })
            return
        }
        if(!descricao) {
            res.status(400).json({ message: "Por favor preencha o campo descricao" })
            return
        }
        if(!caracteristicas) {
            res.status(400).json({ message: "Por favor preencha o campo caracteristicas" })
            return
        }


        const job: JobModel = createJobMatchField({ empresa, descricao, caracteristicas, userId: userIdByToken, ativo: false, titulo, matchField: []})

       
        const id = await createJob(job)
        
        const jobToReturn = {
            ...job,
            _id: id,
        }
        
        res.status(200).json({ ...jobToReturn})
    } catch (error) {
        res.status(500).json({ message: `Erro no servidor: ${error}` })
    }

}