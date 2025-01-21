import { Role } from "./RoleType"

export interface User {
  id: string
  role: Role
  username: string
  email: string
  token: string
  created_at: string
}
