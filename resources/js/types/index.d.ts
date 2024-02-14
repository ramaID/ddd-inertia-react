import { Config } from 'ziggy-js'

export interface User {
  id: number
  name: string
  email: string
  email_verified_at: string
}

export interface Auth {
  user: User
  permissions: string[]
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: Auth
  ziggy: Config & { location: string }
}

export type Collect<T> = {
  current_page: number
  data: T[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string | null
  links: {
    url: string | null
    label: string
    active: boolean
  }[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}

export enum RoleName {
  ADMIN = 'admin',
  STAFF = 'staff',
}

type setDataByObject<TForm> = (data: TForm) => void
type setDataByMethod<TForm> = (data: (previousData: TForm) => TForm) => void
type setDataByKeyValuePair<TForm> = <K extends keyof TForm>(
  key: K,
  value: TForm[K]
) => void

type CombinedDataType<TForm> = setDataByObject<TForm> &
  setDataByMethod<TForm> &
  setDataByKeyValuePair<TForm>
type errors<TForm> = Partial<Record<keyof TForm, string>>

export type FormFields<TForm, AdditionalTForm> = {
  data: TForm
  setData: CombinedDataType<TForm>
  errors: errors<TForm>
} & AdditionalTForm

export type UserFields = {
  name: string
  email: string
  password: string | null
  password_confirmation: string | null
  roles: App.Data.RoleData[]
}
