import { Role } from "./RoleType"

export interface User {
  id: string
  role: Role
  username?: string
  email?: string
  password?: string
  avatar?: string
  token: string
  created_at: string
}
