import { IActivity } from "./activity"

export interface ITicket {
  id: number,
  start_at: string,
  end_at: string,
  price: number,
  quantity: number,
  name: string,
  status: {
    is_open: boolean,
    message: string,
    ticket_sales: {
      in_cart: number,
      in_transaction: {
        pending: number,
        success: number
      },
      total_sold: number
    }
  },
  created_at: string,
  updated_at: string,
  activity: IActivity
}