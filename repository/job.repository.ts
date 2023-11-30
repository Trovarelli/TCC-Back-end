import { Job, JobModel } from "../models";

export const createJob = async (candidato: JobModel) => {
    return Job.create(candidato).then((data) => data._id)
}

export const findJobsByUser = async (userId: string) => {
    return await Job.find({userId}, '-userId -sourceId -curriculo').lean()
}

export const deleteJob = async (userId: string, JobId: string) => {
    return Job.findByIdAndDelete({_id: JobId, userId})
}

export const findJobsById = async (userId: string, JobId: string) => {
    return Job.findById({_id: JobId, userId}, '-userId')
}

export const checkJobExistsByText = async (userId: string, text: string) => {
    return (await Job.find({userId, texto: text,}, '-userId')).length > 0
}

export const controllStatusJob = async (userId: string, JobId: string, controlledStatus: boolean) => {
    return await Job.updateOne({_id: JobId, userId}, {favorito: controlledStatus})
}