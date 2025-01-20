import { Role } from "./RoleType"

export interface User {
  id: string
  role: Role
  email: string
  token: string
  created_at: string
}
