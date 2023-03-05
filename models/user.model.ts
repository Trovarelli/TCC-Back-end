import { Schema, model } from "mongoose";

interface UserModel {
  name: string;
  email: string;
  password: string;
  company: string;
}

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  company: { type: String, required: true },

});

const User = model<UserModel>('user', UserSchema)

export { User, UserModel }

