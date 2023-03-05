import { User, UserModel } from "../models";

export const createUser = async (user: UserModel) => {
    const { name, email, password, company, gender } = user
    const userModel = new User({
        name, email, password, company, gender
    })
    return User.create(userModel)
}

export const findUserById = async (id: string, exclude: string) => {
    return User.findById(id, exclude)
}

export const findUserByEmail = async (email: string) => {
    return User.findOne({ email })
}
