import { IUser } from "./user"

export interface IAthlete {
  id: string
  school_name: string
  full_name: string
  domicile: string
  phone_number: string
  user: IUser
}