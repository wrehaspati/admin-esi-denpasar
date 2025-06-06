export interface IMembership{
  id: number | string
  name: string
  email: string
  phone: string
  address: string
  photo: File
  created_at?: string
  updated_at?: string
}

