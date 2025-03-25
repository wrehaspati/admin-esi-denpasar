export enum IUserRole{
  ADMIN = 1,
  USER = 2,
  ORGANIZER = 3,
  ATHLETE = 4
}

export interface IRole{
  id: number
  name: string
}