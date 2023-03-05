import mongoose from "mongoose";

interface JobModel {
    user: string,
    company: string,
    office: string,
    description: string,
    experience: string,
    skills: string[],
    benefits: string[],
    salary?: number
}

const JobSchema = new mongoose.Schema({
    user: { type: String, required: true },
    company: { type: String, required: true },
    office: { type: String, required: true },
    description: { type: String, required: true },
    experience: { type: String, required: true },
    skills: { type: Array<String>, required: true },
    benefits: { type: Array<String>, required: true },
    salary: { type: Number, required: false },
});

const Job = mongoose.model("Job", JobSchema);

export { Job, JobModel }