import { Schema, model } from "mongoose";

interface UserModel {
  name: string;
  email: string;
  password: string;
  company: string;
  photo?: string
}

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  company: { type: String, required: true },
  photo: { type: String, required: false },
});

const User = model<UserModel>('user', UserSchema)

export { User, UserModel }

