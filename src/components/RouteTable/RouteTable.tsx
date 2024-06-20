import React from 'react'
import RouteEntry from './RouteEntry';

type Props = {
  redirects: { [arg0: string]: string }
}

const RouteTable = (props: Props) => {
  const redirectPaths = Object.keys(props.redirects);

  return (
    <table className='w-full border-separate border-spacing-0 m-2'>
      <thead>
        <tr>
          <th className='w-1/2 border border-black dark:border-white rounded-tl-lg p-2'>Path</th>
          <th className='w-1/2 border-y border-black dark:border-white p-2'>URL</th>
          <th className='w-0 border border-black dark:border-white rounded-tr-lg p-2'>Actions</th>
        </tr>
      </thead>
      {redirectPaths.length === 0 ? (<tbody><tr><td colSpan={3} className="w-full border-x border-b border-black dark:border-white rounded-b-lg p-1 text-center py-4">No routes are set up!</td></tr></tbody>) : (
        <tbody>
          {
            redirectPaths.map(path => <RouteEntry key={`PATH_${path}`} path={path} url={props.redirects[path]} />)
          }
        </tbody>
      )}
    </table>
  )
}

export default RouteTable