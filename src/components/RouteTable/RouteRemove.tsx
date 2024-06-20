'use client'
import React from 'react'
import DeleteIcon from '../Icons/DeleteIcon'
import { useRouter } from 'next/navigation'

type Props = {
  route: string,
  className?: string
}

const RouteRemove = (props: Props) => {
  const router = useRouter();

  const submit = async () => {
    await fetch('/api/routes/delete', {
      body: JSON.stringify({
        path: props.route
      }),
      method: 'post'
    });

    router.refresh();
  }

  return (
    <button aria-label={`Remove ${props.route}`} className={props.className ?? ''} onClick={async () => { await submit(); }}>
      <DeleteIcon className='size-6 text-red-700 hover:text-red-900 dark:text-red-500 dark:hover:text-red-700' aria-hidden={true} />
    </button >
  )
}

export default RouteRemove