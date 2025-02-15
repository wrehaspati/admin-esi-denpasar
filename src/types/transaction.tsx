import { IBankAccount } from "./bank-account"
import { IOrder } from "./order"
import { IUser } from "./user"

export interface ITransaction {
  id: string
  transaction_id: string
  method: string
  proof_image: string
  status: string
  total_price: number
  fee: number
  created_at: string
  updated_at: string
  bank_account: IBankAccount
  orders: IOrder[]
  user: IUser
}