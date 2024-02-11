import { Collect } from '@/types'
import Navlink from './Navlink'

function roundedClassName(items: any[], index: number) {
  if (index === 0) {
    return ' rounded-l-md'
  }

  if (index + 1 === items.length) {
    return ' rounded-r-md'
  }

  return ''
}

export default function Pagination({
  payload,
}: {
  readonly payload: Collect<any>
}) {
  return (
    <div className="flex items-center justify-between pt-3 bg-white border-t border-gray-200">
      <div className="flex justify-between flex-1 sm:hidden">
        {payload.prev_page_url && (
          <Navlink
            href={payload.prev_page_url}
            className="px-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Previous
          </Navlink>
        )}
        {payload.next_page_url && (
          <Navlink
            href={payload.next_page_url}
            className="px-4 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Next
          </Navlink>
        )}
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{payload.from}</span> to{' '}
            <span className="font-medium">{payload.to}</span> of{' '}
            <span className="font-medium">{payload.total}</span> results
          </p>
        </div>
        <div>
          <nav
            className="inline-flex -space-x-px rounded-md shadow-sm isolate"
            aria-label="Pagination"
          >
            {payload.links.map((link, index) =>
              link.url !== null ? (
                <Navlink
                  key={link.label}
                  href={String(link.url)}
                  className={
                    'px-4 text-sm font-semibold focus:z-20 ' +
                    (link.active
                      ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 '
                      : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 ') +
                    roundedClassName(payload.links, index)
                  }
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              ) : (
                <span
                  key={link.label}
                  className={
                    'relative inline-flex items-center py-2 px-4 text-sm font-semibold text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0' +
                    roundedClassName(payload.links, index)
                  }
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              )
            )}
          </nav>
        </div>
      </div>
    </div>
  )
}
