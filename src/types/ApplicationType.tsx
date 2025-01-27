import { User } from "./UserType";

export interface Application {
  id: string
  event_name: string
  event_date: string
  organizer_name: string
  total_prizepool: string
  application_file: string
  status: string
  note: string
  created_at: string
  updated_at: string
  user: User
}