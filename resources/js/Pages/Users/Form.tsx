import { ErrorMessage, Label } from '@/Components/local/fieldset'
import { Input } from '@/Components/local/input'
import { Field as HeadlessField } from '@headlessui/react'
import { CheckboxField, CheckboxGroup } from '@/Components/local/checkbox'
import Checkbox from '@/Components/Checkbox'
import { FormFields, UserFields } from '@/types'
import { useState } from 'react'

export default function UsersForm({
  data,
  setData,
  errors,
  roles,
}: FormFields<UserFields, { roles: App.Data.RoleData[] }>) {
  const [selected, setSelected] = useState<App.Data.RoleData[]>(data.roles)

  return (
    <>
      <HeadlessField className="grid grid-cols-[subgrid] sm:col-span-3">
        <Label>Name</Label>
        <Input
          className="mt-3 sm:col-span-2 sm:mt-0"
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
          autoFocus
        />
        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
      </HeadlessField>
      <HeadlessField className="grid grid-cols-[subgrid] sm:col-span-3">
        <Label>Email</Label>
        <Input
          className="mt-3 sm:col-span-2 sm:mt-0"
          value={data.email}
          onChange={(e) => setData('email', e.target.value)}
          type="email"
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
      </HeadlessField>
      <HeadlessField className="grid grid-cols-[subgrid] sm:col-span-3">
        <Label>Roles</Label>
        <div className="sm:col-span-2">
          <CheckboxGroup>
            {roles.map((role) => (
              <CheckboxField key={'role-option' + role.id}>
                <Checkbox
                  value={role.name}
                  id={'role-' + role.id}
                  defaultChecked={
                    data.roles.filter((r) => r.id === role.id).length > 0
                  }
                  onChange={(e) => {
                    let values = [] as App.Data.RoleData[],
                      selectedRole = roles.find((r) => r.id === role.id)

                    if (e.target.checked && selectedRole) {
                      values = [...selected, selectedRole]
                    } else if (!e.target.checked) {
                      values = [
                        ...selected.filter(
                          (item) => item.id !== selectedRole?.id
                        ),
                      ]
                    }

                    setSelected(values)
                    setData('roles', values)
                  }}
                />
                <Label htmlFor={'role-' + role.id}>
                  {String(role.name).charAt(0).toUpperCase() +
                    role.name.slice(1)}
                </Label>
              </CheckboxField>
            ))}
          </CheckboxGroup>
        </div>
        {errors.roles && <ErrorMessage>{errors.roles}</ErrorMessage>}
      </HeadlessField>
    </>
  )
}
