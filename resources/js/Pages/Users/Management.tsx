import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { Collect, PageProps } from '@/types'
import Table from '@/Components/Table/Index'

export default function UsersManagement({
  auth,
  payload,
}: PageProps<{ payload: Collect<App.Data.UserData> }>) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          User Management
        </h2>
      }
    >
      <Head title="User Management" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <Table payload={payload} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
