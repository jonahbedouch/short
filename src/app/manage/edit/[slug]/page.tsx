import EditRoute from '@/components/EditRoute'
import React from 'react'

const page = ({ params }: { params: { slug: string } }) => {
  return (
    <main className="flex min-h-screen flex-col items-center max-w-screen-2xl lg:px-24 px-2 py-4 mx-auto">
      <EditRoute path={String(params.slug)} />
    </main>
  )
}

export default page