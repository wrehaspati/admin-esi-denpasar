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
  no_hp: string
  created_at: string
  updated_at: string
  team_members: ITeamMember[]
  activity: IActivity
  transaction?: ITransaction
}
//   "id": 451,
//   "team_name": "Vitae dignissimos",
//   "no_hp": "+628537619079",
//   "created_at": "2025/02/14 09:54:48",
//   "updated_at": "2025/02/14 09:54:48",
//   "team_members": [
//       {
//           "id": 2951,
//           "id_game": "a6aca7fe-ad1d-34ad-a088-9bcd67ef4d1e",
//           "name": "Nora Adams Jr.",
//           "nickname": "vance11",
//           "position": "Leader",
//           "domicile": "",
//           "created_at": "2025/02/14 09:54:48",
//           "updated_at": "2025/02/14 09:54:48"
//       },
//       {
//           "id": 2952,
//           "id_game": "f277c231-7778-3f9f-8126-bae3bca7978c",
//           "name": "Mr. Eino Luettgen PhD",
//           "nickname": "anderson.marcellus",
//           "position": "Player",
//           "domicile": "",
//           "created_at": "2025/02/14 09:54:48",
//           "updated_at": "2025/02/14 09:54:48"
//       },
//       {
//           "id": 2953,
//           "id_game": "cfff81a0-4495-3115-b98e-6e30d332c1d0",
//           "name": "Xander Maggio",
//           "nickname": "swaniawski.howell",
//           "position": "Player",
//           "domicile": "",
//           "created_at": "2025/02/14 09:54:48",
//           "updated_at": "2025/02/14 09:54:48"
//       },
//       {
//           "id": 2954,
//           "id_game": "14de66e5-0408-3bb7-b13f-cfaa4e2e7e53",
//           "name": "Vivianne Mayert",
//           "nickname": "catherine.runte",
//           "position": "Player",
//           "domicile": "",
//           "created_at": "2025/02/14 09:54:48",
//           "updated_at": "2025/02/14 09:54:48"
//       },
//       {
//           "id": 2955,
//           "id_game": "7d4d1abc-162c-39fb-8c42-dfa8e033d1b6",
//           "name": "Ernestina Douglas",
//           "nickname": "isabell59",
//           "position": "Player",
//           "domicile": "",
//           "created_at": "2025/02/14 09:54:48",
//           "updated_at": "2025/02/14 09:54:48"
//       },
//       {
//           "id": 2956,
//           "id_game": "8c8ded46-8bb7-3209-a59b-c71edf417d4b",
//           "name": "Idella Weissnat",
//           "nickname": "arthur01",
//           "position": "Support",
//           "domicile": "",
//           "created_at": "2025/02/14 09:54:48",
//           "updated_at": "2025/02/14 09:54:48"
//       },
//       {
//           "id": 2957,
//           "id_game": "4d734942-5b45-3d74-8a17-104f32afb1ed",
//           "name": "Evie Abbott",
//           "nickname": "brenna41",
//           "position": "Support",
//           "domicile": "",
//           "created_at": "2025/02/14 09:54:48",
//           "updated_at": "2025/02/14 09:54:48"
//       }
//   ],
//   "activity": {
//       "id": 131,
//       "name": "Lomba amet",
//       "start_at": "2025/06/26 14:25:27",
//       "end_at": "2025/07/13 14:25:27",
//       "location": "29952 Pouros Summit\nWeberhaven, AZ 17327-7458",
//       "map_link": "http://www.sipes.info/ipsum-cumque-est-qui-voluptatibus-voluptas",
//       "created_at": "2025/02/14 09:54:35",
//       "updated_at": "2025/02/14 09:54:35",
//       "type": {
//           "id": 3,
//           "name": "Lomba",
//           "flow": "competition",
//           "created_at": "2025/02/14 09:54:08",
//           "updated_at": "2025/02/14 09:54:08"
//       }
//   },
//   "transaction": null
// },