import { User, UserModel } from "../models";

export const createUser = async (user: UserModel) => {
    const { name, email, password, company, } = user
    const userModel = new User({
        name, email, password, company,
    })
    return User.create(userModel)
}

export const updateUser = async (user: UserModel, id: string) => {
    const { name, email, password, company, photo } = user

    await User.updateOne({_id: id}, {
        $set: {
            name,
            email,
            company,
            password,
            photo
        }
    })

    return User.findById(id, '-_id')
}

export const findUserById = async (id: string, exclude: string) => {
    return User.findById(id, exclude)
}

export const findUserByEmail = async (email: string) => {
    return User.findOne({ email })
}
