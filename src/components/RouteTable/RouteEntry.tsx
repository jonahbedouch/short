import React from 'react'
import RouteRemove from './RouteRemove'
import RouteEdit from './RouteEdit'
import Link from 'next/link'

type Props = {
  path: string,
  url: string
}

const RouteEntry = (props: Props) => {
  return (
    <tr className='group text-center'>
      <td className='border-x border-b border-black dark:border-white group-last:rounded-bl-lg p-1'>{props.path}</td>
      <td className='border-b border-black dark:border-white p-1'><Link className='underline hover:text-gray-700 dark:hover:text-gray-300' href={props.url}>{props.url}</Link></td>
      <td className='w-0 border-x border-b border-black dark:border-white group-last:rounded-br-lg p-1'>
        <div className="flex w-min mx-auto">
          <RouteEdit route={props.path} className='mr-2' /><RouteRemove route={props.path} />
        </div>
      </td>
    </tr>
  )
}

export default RouteEntry