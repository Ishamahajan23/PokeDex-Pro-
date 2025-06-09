import React from 'react'

export const Loader = () => {
  return (
    <div>
        <div className="flex items-center justify-center h-screen ">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
        </div>
        <p className="text-center text-gray-500">Loading...</p>
    </div>
  )
}
