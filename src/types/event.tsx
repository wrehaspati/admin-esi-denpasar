import { IApplication } from "./application";
import { ICategory } from "./category";
import { IUser } from "./user";

export interface IEvent {
  id?: string
  name: string
  prizepool: string
  event_logo?: string
  event_banner?: string
  is_active?: boolean
  category: ICategory
  organizer: IUser
  application?: IApplication
  location?: string
  created_at?: string
  update_at?: string
}