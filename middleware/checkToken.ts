import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['Authorization']
    const token = authHeader && String(authHeader).split(" ")[1]

    if (!token) return res.status(401).json({ message: 'Acesso negado' })

    try {
        const secret = process.env.SECRET
        jwt.verify(token, secret as string)
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: "Token inválido" })
    }
}
