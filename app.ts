require('dotenv').config()
import express from 'express'
import mongoose from 'mongoose'
import { createUserController, getUserById, loginController } from './controller'
import { checkToken } from './middleware'

const app = express()

// CONFIG JSON
app.use(express.json())

//ROTA PÚBLICA
app.get('/', (req, res) => {
    res.status(200).json({ message: "Bem vindo a nossa API!" })
})

//ROTA PRIVADA
app.get('/user/:id', checkToken, async (req, res) => {
    return getUserById(req, res)
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

mongoose.set('strictQuery', false)

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.xn3pg3y.mongodb.net/TCC?retryWrites=true&w=majority`).then(() => {
    app.listen(3000)
    console.log("Conexão realizada")
}).catch((err) => console.log(err))

