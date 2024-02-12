import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'
import { Collect, PageProps } from '@/types'
import { ErrorMessage, Fieldset, Label } from '@/Components/local/fieldset'
import { Input } from '@/Components/local/input'
import { Field as HeadlessField } from '@headlessui/react'
import { Button } from '@/Components/local/button'
import { FormEventHandler } from 'react'

export default function UsersEdit({
  auth,
  user,
}: PageProps<{ user: App.Data.UserData }>) {
  const { data, setData, put, processing, errors } = useForm({
      name: user.name,
      email: user.email,
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
                    <HeadlessField className="grid grid-cols-[subgrid] sm:col-span-3">
                      <Label>Name</Label>
                      <Input
                        className="mt-3 sm:col-span-2 sm:mt-0"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        autoFocus
                      />
                      {errors.name && (
                        <ErrorMessage>{errors.name}</ErrorMessage>
                      )}
                    </HeadlessField>
                    <HeadlessField className="grid grid-cols-[subgrid] sm:col-span-3">
                      <Label>Email</Label>
                      <Input
                        className="mt-3 sm:col-span-2 sm:mt-0"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        type="email"
                      />
                      {errors.email && (
                        <ErrorMessage>{errors.email}</ErrorMessage>
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
