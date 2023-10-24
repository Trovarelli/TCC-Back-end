import { Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getUserIdByToken = (req: Request): string | undefined => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1] || ''
    const secret = process.env.SECRET
    const decoded = jwt.verify(token, secret as string) as JwtPayload

    return decoded?.key
}