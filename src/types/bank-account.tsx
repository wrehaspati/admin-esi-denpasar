import { IUser } from "./user"

export interface IBankAccount {
  id: string
  bank_name: string
  account_number: string
  account_name: string
  is_default: string
  created_at?: string
  updated_at?: string
  user?: IUser
}