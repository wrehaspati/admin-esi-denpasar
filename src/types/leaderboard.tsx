import { ICategory } from "./category"
import { IGame } from "./game"

export interface ILeaderboard {
  id: string
  tournament_name?: string
  team_name?: string
  rank?: number
  is_approved: string
  created_at?: string
  updated_at?: string
  game?: IGame
  category?: ICategory
  user?: { email: string }
  players?: IPlayer[]
}

interface IPlayer {
  id: number
  name: string
  phone: string
  nickname: string
  id_game: string
  point: number
  created_at: string
  updated_at: string
}