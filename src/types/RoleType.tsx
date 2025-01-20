export enum UserRole{
  ADMIN = 1,
  USER = 2,
  ORGANIZER = 3
}

export interface Role{
  id: number
  name: string
}