import { Application } from "./ApplicationType";
import { Category } from "./CategoryType";
import { User } from "./UserType";

export interface Event {
  id?: string;
  name: string;
  prizepool: string;
  category: Category;
  organizer: User;
  application: Application;
  location?: string;
  created_at?: string;
  update_at?: string;
}