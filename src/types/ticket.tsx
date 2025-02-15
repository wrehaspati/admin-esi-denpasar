import { IActivity } from "./activity"

export interface ITicket {
  id: string,
  start_at: string,
  end_at: string,
  price: string,
  quantity: string,
  name: string,
  status: {
    is_open: boolean,
    message: string,
    ticket_sales: {
      in_cart: string,
      in_transaction: {
        pending: string,
        success: string
      },
      total_sold: string
    }
  },
  created_at: string,
  updated_at: string,
  activity: IActivity
}