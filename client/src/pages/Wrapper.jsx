import React from 'react'
import Menu from '../components/Menu'

export default function Wrapper({children}) {
  return (
    <>
      <div className='flex w-full h-full fixed'>
                    <Menu />
                <div className='w-screen bg-gray-700 flex flex-wrap overflow-scroll grid-cols-3 grid-rows-3'>
                {children}
                </div>
            </div>
    </>
  )
}
