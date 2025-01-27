import { Type } from "./TypeList";

export interface Activity {
  event_id: string
  id: string
  name: string
  start_at: string
  end_at: string
  location: string
  map_link: string
  created_at: string
  updated_at: string
  type: Type
}