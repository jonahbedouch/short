'use client'
import React from 'react'

const AddRoute = () => {
  return (
    <form method="post" action="/api/routes/add" encType='application/json' className='w-full flex flex-col items-center align-middle justify-center bg-gray-300 dark:bg-gray-900 dark:border dark:border-white p-2 rounded-lg' >
      <h2 className='font-semibold'>Add a new route </h2>
      <div className="w-full flex md:flex-row flex-col items-center align-middle justify-center mx-auto">
        <fieldset className='mt-2 md:block md:w-auto flex w-full items-center'>
          <label htmlFor="path" className='mr-1'>Path:</label>
          <input id="path" type="text" name="path" placeholder='Enter a Path' className='md:mr-4 md:w-auto w-full px-2 py-1 rounded-lg dark:bg-black dark:text-white' />
        </fieldset>
        <fieldset className='mt-2 md:block md:w-auto flex w-full items-center'>
          <label htmlFor="url" className='mr-1'>Url:</label>
          <input id="url" type="url" name="url" placeholder='Enter a URL' className='md:mr-4 md:w-auto w-full px-2 py-1 rounded-lg dark:bg-black dark:text-white' />
        </fieldset>
        <input type="submit" value="Submit" className='md:w-min w-full mt-2 p-2 bg-blue-400 hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 hover:cursor-pointer rounded-lg' />
      </div>
    </form>
  )
}

export default AddRoute