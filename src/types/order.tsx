import { IActivity } from "./activity"
import { IGame } from "./game"
import { ITicket } from "./ticket"
import { IUser } from "./user"

export interface IOrderableCompetition {
  id: string
  start_at: string
  end_at: string
  price: string
  quantity: number
  status: {
    data: {
      is_open: boolean
      message: string
      competition_sales: {
        in_cart: number
        in_transaction: {
          pending: number
          success: number
        }
        total_sold: number
      }
    }
  }
  created_at: string
  updated_at: string
  game: IGame
  activity: IActivity
}

export interface IOrder {
  id: string
  order_number: string
  amount: string
  quantity?: number
  team_name?: string
  created_at: string
  updated_at: string
  orderable: ITicket | IOrderableCompetition
  user: IUser
}