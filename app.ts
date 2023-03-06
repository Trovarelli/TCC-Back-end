import express from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { createUserController, getUserById, loginController } from './controller'
import { checkToken } from './middleware'
require('dotenv').config()
const cors = require('cors')

const app = express()

// CONFIG JSON
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173'
}))

//ROTA PÚBLICA
app.get('/', (req, res) => {
    res.status(200).json({ message: "Bem vindo a nossa API!" })
})

app.post('/auth', (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if (!token) return res.status(401).json({ message: 'Token vazio' })
    try {
        const secret = process.env.SECRET
        jwt.verify(token, secret as string)
        return res.status(200).json({ message: 'Ok' })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Token inválido" })
    }

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

