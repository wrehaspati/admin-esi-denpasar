import { IActivity } from "./activity"
import { IGame } from "./game"
import { ITransaction } from "./transaction"

export interface ICompetition {
  id: number
  start_at: string
  end_at: string
  price: number
  quantity: number
  status?: {
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
  created_at?: string
  updated_at?: string
  game?: IGame
  activity?: IActivity
}

export interface ITeamMember {
  id: number
  id_game: string
  name: string
  nickname: string
  position: string
  domicile: string
  created_at: string
  updated_at: string
}

export interface ICompetitionRegistration {
  id: number
  team_name: string
  team_members: ITeamMember[]
  no_hp: string
  created_at: string
  updated_at: string
  competition: ICompetition
  activity: IActivity
  transaction?: ITransaction
}