import { CandidateModel, JobModel } from "../models"

export const createCandidatoMatchField = (candidato: CandidateModel) => {
    const matchField:string[] = []
    for (const key in candidato) {
        if (candidato.hasOwnProperty(key) && key !== 'userId' && key !== 'curriculo' && key !== 'texto' && key !== 'favorito' && key !== '_id') {
            let element = candidato[key as keyof typeof candidato] as string | string[] | boolean
            if (element && Array.isArray(element)) {
                element.forEach((e) => {
                    const splitedElement = String(e).split(' ')
                    splitedElement.forEach((s) => matchField.push(`${key}:${s.toLowerCase()}`))
                })
            }
            if(element) {
                if(typeof element === 'boolean') element = element ? 'sim' : 'nao'
                if(element === 'F' || element === 'M') {
                    if(element === 'F') matchField.push('genero:feminino')
                    if(element === 'M') matchField.push('genero:masculino')

                } else {
                    const splitedElement = String(element).split(' ')
                    splitedElement.forEach((s) => matchField.push(`${key}:${s.toLowerCase()}`))
                }
                
            }
        }
    }

    const newCandidato = {
        ...candidato,
        matchField
    }

    return newCandidato
}

export const createJobMatchField = (job: JobModel) => {
    const matchField:string[] = []
    for (const key in job) {
        if (job.hasOwnProperty(key) && key ==='caracteristicas') {
            let element = job[key as keyof typeof job] as string[]
           
            element.forEach((e) => {
                const splitedElement = String(e).split(' ')
                splitedElement.forEach((s) => matchField.push(`${key}:${s.toLowerCase()}`))
            })
        }
    }

    const newJob = {
        ...job,
        matchField
    }

    return newJob
}