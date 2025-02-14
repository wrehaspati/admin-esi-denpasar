import { ITypeEvent } from "./event-type"


export interface IActivity {
  event_id: string
  id: string
  name: string
  start_at: string
  end_at: string
  location: string
  map_link: string
  created_at: string
  updated_at: string
  type: ITypeEvent
}