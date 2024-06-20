'use client'
import React from 'react'
import DeleteIcon from '../Icons/DeleteIcon'
import { useRouter } from 'next/navigation';

type Props = {
  editor: string;
  className?: string;
}

const EditorRemove = (props: Props) => {
  const router = useRouter();

  const submit = async () => {
    await fetch('/api/accounts/delete', {
      body: JSON.stringify({
        email: props.editor
      }),
      method: 'post'
    });

    router.refresh();
  }

  return (
    <button aria-label={`Remove ${props.editor}`} className={'group ' + props.className ?? ''} disabled={props.editor === process.env.NEXT_PUBLIC_SUPERADMIN} onClick={async () => { await submit() }}>
      <DeleteIcon className='size-6 text-red-700 hover:text-red-900 dark:text-red-500 dark:hover:text-red-700 group-disabled:text-gray-500 dark:group-disabled:text-gray-400' aria-hidden={true} />
    </button>
  )
}

export default EditorRemove