import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'
import { Collect, PageProps, UserFields } from '@/types'
import { ErrorMessage, Fieldset, Label } from '@/Components/local/fieldset'
import { Input } from '@/Components/local/input'
import { Field as HeadlessField } from '@headlessui/react'
import { Button } from '@/Components/local/button'
import { FormEventHandler } from 'react'
import { Radio, RadioField, RadioGroup } from '@/Components/local/radio'
import UsersForm from './Form'

export default function UsersEdit({
  auth,
  user,
  roles,
}: PageProps<{ user: App.Data.UserData; roles: App.Data.RoleData[] }>) {
  const { data, setData, put, processing, errors } = useForm<UserFields>({
      name: user.name,
      email: user.email,
      password: null,
      password_confirmation: null,
      roles: user.roles,
    }),
    submit: FormEventHandler = (e) => {
      e.preventDefault()

      put(route('users.update', user))
    }

  return (
    <AuthenticatedLayout
      auth={auth}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          User: Edit
        </h2>
      }
    >
      <Head title="Create new user" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white dark:*:bg-zinc-800 shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <form onSubmit={submit}>
                <Fieldset>
                  <div
                    data-slot="control"
                    className="grid items-center grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3"
                  >
                    <UsersForm
                      data={data}
                      setData={setData}
                      errors={errors}
                      roles={roles}
                    />

                    <HeadlessField className="grid grid-cols-[subgrid] sm:col-span-3">
                      <Label></Label>
                      <div>
                        <Button type="submit" disabled={processing}>
                          Submit
                        </Button>
                        <Button
                          href={route('users.index')}
                          className="ml-4"
                          plain
                          disabled={processing}
                        >
                          Back
                        </Button>
                      </div>
                    </HeadlessField>
                  </div>
                </Fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
