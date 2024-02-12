import { Collect } from '@/types'
import Pagination from './Pagination'
import { Button } from '../local/button'

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Index({
  payload,
  authID,
  setIsOpen,
  setSelectedUser,
  canCreate,
  canEdit,
  canDelete,
}: Readonly<{
  payload: Collect<App.Data.UserData>
  authID: number
  setIsOpen: (isOpen: boolean) => void
  setSelectedUser: (user: null | App.Data.UserData) => void
  canCreate: boolean
  canEdit: boolean
  canDelete: boolean
}>) {
  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Users
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in the application.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          {canCreate && <Button href={route('users.create')}>Add User</Button>}
        </div>
      </div>

      <div className="flow-root mt-8">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="sticky top-0 z-5 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-5 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-5 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-5 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                  >
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {payload.data.map((user, personIdx) => (
                  <tr key={user.id}>
                    <td
                      className={classNames(
                        personIdx !== payload.data.length - 1
                          ? 'border-b border-gray-200'
                          : '',
                        'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                      )}
                    >
                      {user.name}
                    </td>
                    <td
                      className={classNames(
                        personIdx !== payload.data.length - 1
                          ? 'border-b border-gray-200'
                          : '',
                        'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell'
                      )}
                    >
                      {user.email}
                    </td>
                    <td
                      className={classNames(
                        personIdx !== payload.data.length - 1
                          ? 'border-b border-gray-200'
                          : '',
                        'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                      )}
                    >
                      {'-'}
                    </td>
                    <td
                      className={classNames(
                        personIdx !== payload.data.length - 1
                          ? 'border-b border-gray-200'
                          : '',
                        'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8 space-x-4'
                      )}
                    >
                      {user.id !== authID && canDelete && (
                        <Button
                          plain
                          onClick={() => {
                            setSelectedUser(user)
                            setIsOpen(true)
                          }}
                        >
                          Delete<span className="sr-only">, {user.name}</span>
                        </Button>
                      )}
                      {canEdit && (
                        <Button href={route('users.edit', user)}>
                          Edit<span className="sr-only">, {user.name}</span>
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Pagination payload={payload} />
    </div>
  )
}
