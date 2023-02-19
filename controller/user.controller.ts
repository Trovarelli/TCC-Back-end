import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import{ findUserById, findUserByEmail, createUser} from '../repository'

export const createUserController = async (req: Request, res: Response) => {
    const {name, email, password, confirmPassword} =  req.body

    //validações
    if(!name) return res.status(422).json({msg: "O nome é obrigatório"})
    
    if(!email) return res.status(422).json({msg: "O e-mail é obrigatório"})
    
    if(!password) return res.status(422).json({msg: "A senha é obrigatória"})
    
    if(password !== confirmPassword) return res.status(422).json({msg: "As senhas devem ser iguais"})

    const userExists = await findUserByEmail(email)

    if(userExists) return res.status(422).json({msg: "Este e-mail ja está cadastrado"})

    // criar a senha
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // criar o usuario
    const user = {
        name, email, password: passwordHash
    }
    try {
        await createUser(user)
        res.status(201).json({msg: "Usuário criado com sucesso!"})
    }catch(error) {
        console.log(error)
        res.status(500).json({msg: `Erro no servidor: ${error}`})
    }

}

export const loginController = async (req: Request, res: Response) => {
    const {email, password} = req.body
    //validações
    if(!email) return res.status(422).json({msg: "O e-mail é obrigatório"})
    
    if(!password) return res.status(422).json({msg: "A senha é obrigatória"})

    const user = await findUserByEmail(email)

    if(!user) return res.status(404).json({msg: "Usuário não cadastrado"})

    // checar a senha
    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword) return res.status(422).json({msg: "Senha inválida"})
    try {
        const secret = process.env.SECRET
        const token = jwt.sign({
            id: user._id
        }, secret as string, {expiresIn: process.env.JWT_EXPIRES_IN})

        res.status(200).json({msg: "Autenticação realizada com sucesso", token})
    }catch(err) {
        console.log(err)
        res.status(500).json({msg: `Erro no servidor: ${err}`})
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const id = req.params.id

    // verificar se o usuario existe
    const user = await findUserById (id, '-password')

    if (!user) return res.status(404).json({ msg: "Usuário não encontrado" })

    res.status(200).json({ user })
}