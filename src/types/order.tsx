import { ICompetitionRegistration } from "./competition"
import { ITicket } from "./ticket"
import { IUser } from "./user"

export interface IOrder {
  id: string
  order_number: string
  amount: string
  quantity?: number
  created_at: string
  updated_at: string
  orderable: ITicket | ICompetitionRegistration
  user: IUser
}