'use client'
import React from 'react'



const AddEditor = () => {
  return (
    <form method="post" action="/api/accounts/add" encType='application/json' className='w-full flex flex-col items-center align-middle justify-center bg-gray-300 dark:bg-gray-900 dark:border dark:border-white p-2 rounded-lg' >
      <h2 className='font-semibold'>Add a new Editor </h2>
      <div className="w-full flex md:flex-row flex-col items-center align-middle justify-center mx-auto">
        <fieldset className="mt-2 md:w-auto flex w-full items-center">
          <label htmlFor="email" className='mr-1'>Email:</label>
          <input id="email" type="email" name="email" placeholder='Enter an Email' className='w-full md:mr-4 px-2 py-1 rounded-lg dark:bg-black dark:text-white' />
        </fieldset>
        <input type="submit" value="Submit" className='mt-2 md:w-min w-full p-2 bg-blue-400 hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 hover:cursor-pointer rounded-lg' />
      </div>
    </form>
  )
}

export default AddEditor