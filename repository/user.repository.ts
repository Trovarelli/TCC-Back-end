import {User} from "../models";

export const createUser = async (user: {name: string, email: string, password: string}) => {
    const {name, email, password} = user
    const userModel = new User({
        name, email, password
    })
    return User.create(userModel)
}

export const findUserById = async (id: string, exclude: string) => {
    return User.findById(id, exclude)
}

export const findUserByEmail = async (email: string) => {
    return User.findOne({email})
}
