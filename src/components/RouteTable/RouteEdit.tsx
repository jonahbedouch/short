import Link from 'next/link'
import React from 'react'
import EditIcon from '../Icons/EditIcon'

type Props = {
  route: string
  className?: string
}

const RouteEdit = (props: Props) => {
  return (
    <Link href={`/manage/edit/${props.route}`} aria-label={`Edit ${props.route}`} className={props.className ?? ''}>
      <EditIcon className='size-6 text-green-700 hover:text-green-900 dark:text-green-500 dark:hover:text-green-700' aria-hidden={true} />
    </Link>
  )
}

export default RouteEdit