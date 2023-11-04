import express from 'express'
import mongoose from 'mongoose'
import { createUserController, loginController, createCandidateController, getCadidateController, updateUserController, deleteCadidateController } from './controller'
import { checkToken } from './middleware'

require('dotenv').config()
const cors = require('cors')

const app = express()

app.use(express.json({limit: '50mb'}))

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.post('/candidate/:id', checkToken, (req, res) => {
    return createCandidateController(req, res)
});

app.post('/candidate/:id', checkToken, (req, res) => {
    return deleteCadidateController(req, res)
});

app.get('/candidate/:id', checkToken, (req, res) => {
    return getCadidateController(req, res)
});

//ROTA PÚBLICA
app.get('/', (req, res) => {
    res.status(200).json({ message: "Bem vindo a nossa API!" })
})

//ROTA PRIVADA
app.post('/user/:id', checkToken, async (req, res) => {
    return updateUserController(req, res)
})

//ROTA DE REGISTRO
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
