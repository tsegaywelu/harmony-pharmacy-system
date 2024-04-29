import React from 'react'

function spinner() {
  return (
    <div className="fixed inset-0 bg-black z-[9999] flex item-center justify-center opacity-70">
        <div className='w-10 h-10 border-4 border-solid border-white-100 border-t-transparent rounded-full animate-spin'>

        </div>
    </div>
  )
}

export default spinner