import React from 'react'
import EditorRemove from './EditorRemove'

type Props = {
  editor: string,
}

const EditorEntry = (props: Props) => {
  return (
    <tr className='group text-center'>
      <td className='w-full border-x border-b border-black dark:border-white group-last:rounded-bl-lg p-1'>{props.editor}</td>
      <td className='w-0 border-x border-b border-black dark:border-white group-last:rounded-br-lg p-1'>
        <div className="flex w-min mx-auto">
          <EditorRemove editor={props.editor} />
        </div>
      </td>
    </tr>
  )
}

export default EditorEntry