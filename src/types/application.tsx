import { IUser } from "./user";

export interface IApplication {
  id: string
  event_name: string
  event_date: string
  organizer_name: string
  total_prizepool: string
  application_file: string
  status: string
  note: string
  response_letter: string
  created_at: string
  updated_at: string
  user: IUser
}