import { IRole } from "./role"

export interface IUser {
  id: string
  role: IRole
  username: string
  email: string
  password?: string
  avatar?: string
  token: string
  created_at: string
}
