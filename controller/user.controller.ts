import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { findUserById, findUserByEmail, createUser, updateUser } from '../repository'
import { getUserIdByToken } from "../utils";
import { UserModel } from "../models";

export const updateUserController = async (req: Request, res: Response) => {
    const { name, email, password, company, photo } = req.body

    if (!name) return res.status(400).json({ message: "O nome é obrigatório" })

    if (!email) return res.status(400).json({ message: "O e-mail é obrigatório" })

    if (!company) return res.status(400).json({ message: "A empresa é obrigatória" })

    const user = await findUserByEmail(email)
    const userIdByToken = getUserIdByToken(req)

    if(user?._id.toString() !== userIdByToken) 
        return res.status(401).json({ message: "Só é possivel atualizar informações do mesmo usuário logado" })

    const checkPassword = await bcrypt.compare(password, (user?.password || ''))

    const salt = await bcrypt.genSalt(12)
    let passwordHash = user?.password

    if (!checkPassword && password !== '') {
        passwordHash = await bcrypt.hash(password, salt)
    }

    const newUser: UserModel = {name, email, password: passwordHash || '', company, photo}

    try {
        await updateUser(newUser, (userIdByToken || ''))
        res.status(201).json({...newUser })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: `Erro no servidor: ${error}` })
    }
}


export const createUserController = async (req: Request, res: Response) => {
    const { name, email, password, confirmPassword, company, photo } = req.body

    if (!name) return res.status(400).json({ message: "O nome é obrigatório" })

    if (!email) return res.status(400).json({ message: "O e-mail é obrigatório" })

    if (!password) return res.status(400).json({ message: "A senha é obrigatória" })

    if (!company) return res.status(400).json({ message: "A empresa é obrigatória" })

    if (password !== confirmPassword) return res.status(400).json({ message: "As senhas devem ser iguais" })

    const userExists = await findUserByEmail(email)

    if (userExists) return res.status(400).json({ message: "Este e-mail ja está cadastrado" })

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = {
        name, email, password: passwordHash, company, photo: photo ?? ''
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

    if (!checkPassword) return res.status(400).json({ message: "Usuário ou senha inválidos" })

    try {
        const secret = process.env.SECRET
        const token = jwt.sign({
            key: user._id
        }, secret as string, { expiresIn: process.env.JWT_EXPIRES_IN })

        const {name, company, photo} = user

        res.status(200).json({ message: `Olá ${user.name}, seja bem vindo(a)`, token, nome: name, empresa: company, foto: photo })
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