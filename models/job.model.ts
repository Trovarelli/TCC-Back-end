import mongoose from "mongoose";

interface JobModel {
    userId: string,
    empresa: string,
    descricao: string,
    titulo: string,
    caracteristicas: string[],
    ativo?: boolean,
    matchField: string[]
}

const JobSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    empresa: { type: String, required: true },
    descricao: { type: String, required: true },
    titulo: { type: String, required: true },
    caracteristicas: { type: Array<String>, required: true },
    ativo: { type: Boolean, required: true, default: true  },
    matchField: {type: Array<String>, required: false, readonly: true}
});

const Job = mongoose.model("Job", JobSchema);

export { Job, JobModel }