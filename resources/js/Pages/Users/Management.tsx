import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'
import { Collect, PageProps } from '@/types'
import Table from '@/Components/Table/Index'
import { FormEventHandler, useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogDescription,
  DialogTitle,
} from '@/Components/local/dialog'
import { Button } from '@/Components/local/button'

export default function UsersManagement({
  auth,
  payload,
}: PageProps<{ payload: Collect<App.Data.UserData> }>) {
  const [isOpen, setIsOpen] = useState(false),
    [selectedUser, setSelectedUser] = useState<null | App.Data.UserData>(null),
    { delete: destroy, processing } = useForm(),
    deleteUser: FormEventHandler = (e) => {
      e.preventDefault()

      if (selectedUser) {
        destroy(route('users.destroy', selectedUser), {
          preserveScroll: true,
          onSuccess: () => setIsOpen(false),
          onFinish: () => setIsOpen(false),
        })
      }
    }

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
              <Table
                payload={payload}
                authID={auth.user.id}
                setIsOpen={setIsOpen}
                setSelectedUser={setSelectedUser}
              />

              <Dialog open={isOpen} onClose={setIsOpen}>
                <DialogTitle>Delete Confirmation</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete{' '}
                  <span className="font-semibold">{selectedUser?.name}</span>?
                </DialogDescription>
                <DialogActions>
                  <Button plain onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={deleteUser}
                    disabled={processing}
                    color="red"
                  >
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
