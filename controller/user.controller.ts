import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { findUserById, findUserByEmail, createUser } from '../repository'

export const createUserController = async (req: Request, res: Response) => {
    const { name, email, password, confirmPassword, company, gender } = req.body

    const defaultGenders = ['M', 'F', 'O']

    if (!name) return res.status(400).json({ message: "O nome é obrigatório" })

    if (!email) return res.status(400).json({ message: "O e-mail é obrigatório" })

    if (!password) return res.status(400).json({ message: "A senha é obrigatória" })

    if (!company) return res.status(400).json({ message: "A empresa é obrigatória" })

    if (!gender) return res.status(400).json({ message: "O gênero é obrigatório" })

    if (!defaultGenders.includes(gender)) return res.status(400).json({ message: "Tipo de gênero inválido" })

    if (password !== confirmPassword) return res.status(400).json({ message: "As senhas devem ser iguais" })

    const userExists = await findUserByEmail(email)

    if (userExists) return res.status(400).json({ message: "Este e-mail ja está cadastrado" })

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = {
        name, email, password: passwordHash, company, gender
    }

    try {
        await createUser(user)
        res.status(201).json({ message: "Usuário criado com sucesso!" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: `Erro no servidor: ${error}` })
    }

}

export const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email) return res.status(400).json({ message: "O e-mail é obrigatório" })

    if (!password) return res.status(400).json({ message: "A senha é obrigatória" })

    const user = await findUserByEmail(email)

    if (!user) return res.status(404).json({ message: "Usuário não cadastrado" })

    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) return res.status(400).json({ message: "Senha inválida" })

    try {
        const secret = process.env.SECRET
        const token = jwt.sign({
            key: user._id
        }, secret as string, { expiresIn: process.env.JWT_EXPIRES_IN })

        res.status(200).json({ message: `Olá ${user.name.split(' ')[0]}, seja bem vindo(a)`, token })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: `Erro no servidor: ${err}` })
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const id = req.params.id

    try {
        const user = await findUserById(id, '-password -_id')

        if (!user) return res.status(404).json({ message: "Usuário não encontrado" })
        res.status(200).json({ user })
    }
    catch (err) {
        res.status(400).json({ message: "Id inválido" })
    }
}