import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'
import { PageProps, UserFields } from '@/types'
import { ErrorMessage, Fieldset, Label } from '@/Components/local/fieldset'
import { Input } from '@/Components/local/input'
import { Field as HeadlessField } from '@headlessui/react'
import { Button } from '@/Components/local/button'
import { FormEventHandler } from 'react'
import UsersForm from './Form'

export default function UsersCreate({
  auth,
  roles,
}: PageProps<{ roles: App.Data.RoleData[] }>) {
  const { data, setData, post, processing, errors } = useForm<UserFields>({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      roles: [],
    }),
    submit: FormEventHandler = (e) => {
      e.preventDefault()

      post(route('users.store'))
    }

  return (
    <AuthenticatedLayout
      auth={auth}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          User: Create
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
                      <Label>Password</Label>
                      <Input
                        className="mt-3 sm:col-span-2 sm:mt-0"
                        value={String(data.password)}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                      />
                      {errors.password && (
                        <ErrorMessage>{errors.password}</ErrorMessage>
                      )}
                    </HeadlessField>
                    <HeadlessField className="grid grid-cols-[subgrid] sm:col-span-3">
                      <Label>Password Confirmation</Label>
                      <Input
                        className="mt-3 sm:col-span-2 sm:mt-0"
                        value={String(data.password_confirmation)}
                        onChange={(e) =>
                          setData('password_confirmation', e.target.value)
                        }
                        type="password"
                      />
                      {errors.password_confirmation && (
                        <ErrorMessage>
                          {errors.password_confirmation}
                        </ErrorMessage>
                      )}
                    </HeadlessField>
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
