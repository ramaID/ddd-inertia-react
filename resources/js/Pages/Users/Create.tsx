import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'
import { PageProps } from '@/types'
import { ErrorMessage, Fieldset, Label } from '@/Components/local/fieldset'
import { Input } from '@/Components/local/input'
import { Field as HeadlessField } from '@headlessui/react'
import { Button } from '@/Components/local/button'
import { FormEventHandler } from 'react'

export default function UsersCreate({ auth }: PageProps) {
  const { data, setData, post, processing, errors } = useForm({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
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
                      <Label>Password</Label>
                      <Input
                        className="mt-3 sm:col-span-2 sm:mt-0"
                        value={data.password}
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
                        value={data.password_confirmation}
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
