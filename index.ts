import express from 'express'
import mongoose from 'mongoose'
import { createUserController, loginController, createCandidateController, getAllCadidateController, updateUserController, deleteCadidateController, getCandidateCurriculumController, favoriteCandidateController } from './controller'
import { checkToken } from './middleware'
import { createJobController, deleteJobController, getAllJobController } from './controller/job.controller'

require('dotenv').config()
const cors = require('cors')

const app = express()

app.use(express.json({limit: '50mb'}))

app.use(cors({
    origin: '*',  
}))

app.get('/', (req, res) => {
    return res.send('Seja bem vinda a tahr API')
});

app.get('/candidate/:id', checkToken, (req, res) => {
    return getAllCadidateController(req, res)
});

app.post('/candidate/:id', checkToken, (req, res) => {
    return createCandidateController(req, res)
});

app.post('/candidate/:id/:candidatoId', checkToken, (req, res) => {
    return deleteCadidateController(req, res)
});

app.get('/candidate/curriculum/:id/:candidatoId', checkToken, (req, res) => {
    return getCandidateCurriculumController(req, res)
});

app.post('/candidate/favorite/:id/:candidatoId', checkToken, (req, res) => {
    return favoriteCandidateController(req, res)
});

app.get('/job/:id', checkToken, (req, res) => {
    return getAllJobController(req, res)
});

app.post('/job/:id', checkToken, (req, res) => {
    return createJobController(req, res)
});

app.post('/job/:id/:jobId', checkToken, (req, res) => {
    return deleteJobController(req, res)
});

app.post('/user/:id', checkToken, async (req, res) => {
    return updateUserController(req, res)
})

app.post('/auth/register', async (req, res) => {
    return createUserController(req, res)
})


//ROTA DE LOGIN
app.post('/auth/login', async (req, res) => {
    loginController(req, res)
})

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS
const dbName = process.env.DB_NAME

mongoose.set('strictQuery', false)

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.xn3pg3y.mongodb.net/${dbName}?retryWrites=true&w=majority`).then(() => {
    app.listen(3001)
    console.log("Conexão realizada")
}).catch((err) => console.log(err))
