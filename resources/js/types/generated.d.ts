declare namespace App.Data {
  export type RoleData = {
    id: string
    name: App.Enums.RoleName | []
  }
  export type UserData = {
    id: number | null
    name: string
    email: string
    password: string | null
    roles: Array<any>
  }
}
declare namespace App.Enums {
  export type RoleName = 'admin' | 'staff'
}
