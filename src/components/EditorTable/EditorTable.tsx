import React from 'react'
import EditorEntry from './EditorEntry'

type Props = {
  editors: string[]
}

const EditorTable = (props: Props) => {
  return (
    <table className='w-full border-separate border-spacing-0 m-2'>
      <thead>
        <tr>
          <th className='border border-black dark:border-white rounded-tl-lg p-2'>Editor</th>
          <th className='border border-black dark:border-white rounded-tr-lg p-2'>Actions</th>
        </tr>
      </thead>
      {props.editors.length === 0 ? (<tbody><tr><td colSpan={3} className="w-full border-x border-b border-black dark:border-white group-last:rounded-br-lg p-1">T</td></tr></tbody>) : (
        <tbody>
          {
            props.editors.map(editor => <EditorEntry key={`EDITOR_${editor}}`} editor={editor} />)
          }
        </tbody>
      )}
    </table >
  )
}

export default EditorTable